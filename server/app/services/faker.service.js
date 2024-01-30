import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import { cryptPassword } from "./password.service.js";
import { UserSetting } from "../models/user-settings.model.js";
import crypto from "crypto";

async function sha256Async(data) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    hash.update(Buffer.from(data));
    const digest = hash.digest("hex");
    resolve(digest);
  });
}

async function createRandomUser() {
  const login = faker.helpers.unique(faker.internet.userName);
  const hashedPassword = await sha256Async(login);
  const password = await cryptPassword(hashedPassword);
  const name = faker.name.firstName();
  const surname = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [name, surname]);
  const dateOfBirth = faker.date
    .birthdate({ min: 18, max: 99, mode: "age" })
    .toISOString()
    .slice(0, 10);

  return {
    login,
    password,
    email,
    name,
    surname,
    dateOfBirth,
  };
}

// Function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Function to convert radians to degrees
function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

// Function to generate a random coordinate within a radius of a central point
function generateRandomPoint(center, radius) {
  const radiusInKm = radius / 6371; // Convert radius from kilometers to radians (Earth's radius is approximately 6371km)

  // Generate a random distance within the radius
  const distance = Math.sqrt(Math.random()) * radiusInKm;

  // Generate a random bearing, between 0 and 360 degrees
  const bearing = Math.random() * 2 * Math.PI;

  const centerLatRadians = toRadians(center.lat);
  const centerLngRadians = toRadians(center.lng);

  // Calculate the latitude of the point
  const latRadians = Math.asin(
    Math.sin(centerLatRadians) * Math.cos(distance) +
      Math.cos(centerLatRadians) * Math.sin(distance) * Math.cos(bearing)
  );

  // Calculate the longitude of the point
  let lngRadians =
    centerLngRadians +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distance) * Math.cos(centerLatRadians),
      Math.cos(distance) - Math.sin(centerLatRadians) * Math.sin(latRadians)
    );

  // Normalize the longitude to be within the range -180 to +180
  lngRadians = ((lngRadians + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;

  return {
    latitude: toDegrees(latRadians),
    longitude: toDegrees(lngRadians),
  };
}

async function createUserProfile() {
  const bioLength = faker.datatype.number({ min: 1, max: 3 });
  const bio = faker.lorem.sentences(bioLength);
  const genders = ["m", "f", "nb"];
  const genderType = faker.datatype.number({ min: 0, max: 2 });
  const gender = genders[genderType];

  const verified = true;
  const onboarded = true;
  const lastOnline = faker.date.between("2023-01-01", "2023-03-30");

  const prefMale = faker.datatype.boolean();
  const prefFemale = faker.datatype.boolean();
  const prefEnby = faker.datatype.boolean();

  const imgNb = faker.datatype.number({ min: 1, max: 5 });
  const imgA = faker.image.cats(640, 480, true);
  const imgB = imgNb >= 2 ? faker.image.cats(640, 480, true) : null;
  const imgC = imgNb >= 3 ? faker.image.cats(640, 480, true) : null;
  const imgD = imgNb >= 4 ? faker.image.cats(640, 480, true) : null;
  const imgE = imgNb == 5 ? faker.image.cats(640, 480, true) : null;

  const hasTags = faker.datatype.boolean();
  let tags = [];
  if (hasTags) {
    const tagsNb = faker.datatype.number({ min: 1, max: 5 });
    tags = faker.helpers.unique(() => faker.random.words(tagsNb).split(" "));
  }

  // Corresponds to 96 boulevard bessières, 75017 Paris
  // const centerCoords = { lat: 48.89639, lng: 2.31845 };
  const cities = [
    { lat: 48.89639, lng: 2.31845 }, // Paris
    { lat: 43.60426, lng: 1.44367 }, // Toulouse
    { lat: 43.0794693, lng: 0.4419014 }, // Tuzaguet
    { lat: 43.2957547, lng: -0.3685668 }, // Pau
    { lat: 43.6463558, lng: 0.5850507 }, // Auch
    { lat: 43.0090629, lng: 1.1195059 }, // Lorp-Sentaraille
  ];

  const centerCoords =
    cities[faker.datatype.number({ min: 0, max: cities.length - 1 })];
  // Generate a random point within 100km of the center coordinates
  const { latitude, longitude } = generateRandomPoint(centerCoords, 100);

  const coordinate = { x: longitude, y: latitude };

  const rating = faker.datatype.number({ min: 0, max: 95 });

  return {
    bio,
    gender,
    verified,
    onboarded,
    lastOnline,
    prefMale,
    prefFemale,
    prefEnby,
    imgA,
    imgB,
    imgC,
    imgD,
    imgE,
    tags,
    coordinate,
    rating,
  };
}

function createUserSettings(login) {
  const ageMin = 18;
  const ageMax = 55;
  const distMin = 0;
  const distMax = 100;
  const fameMin = 0;
  const fameMax = 100;

  return {
    userLogin: login,
    ageMin,
    ageMax,
    distMin,
    distMax,
    fameMin,
    fameMax,
  };
}

const addAdminUser = async () => {
  try {
    const adminUser = await createRandomUser();
    adminUser.login = "admin";
    const hashedPassword = await sha256Async("admin");
    adminUser.password = await cryptPassword(hashedPassword);

    const adminProfile = await createUserProfile();
    adminProfile.prefMale = true;
    adminProfile.prefFemale = true;
    adminProfile.prefEnby = true;

    const newUser = await User.create(adminUser);
    await User.updateByLogin(newUser.login, adminProfile);

    await UserSetting.create(createUserSettings(newUser.login));
    console.log("Admin user created");
  } catch (err) {
    console.log(err);
  }
};

async function createUsersBatch(startIndex, endIndex) {
  const userPromises = [];
  for (let i = startIndex; i < endIndex; i++) {
    userPromises.push(createUserWithSettings());
  }
  return Promise.all(userPromises);
}

async function createUserWithSettings() {
  try {
    const user = await createRandomUser();
    await User.create(user);
    const userProfile = await createUserProfile();
    await User.updateByLogin(user.login, userProfile);
    const userSettings = createUserSettings(user.login);
    await UserSetting.create(userSettings);
  } catch (err) {
    console.error("Error in user creation:", err);
  }
}

const BATCH_SIZE = 100;

const populateDB = async () => {
  console.log("Populating DB");
  try {
    const userCount = await User.count();
    console.log(`User count: ${userCount}`);
    for (let i = userCount; i < 2100; i += BATCH_SIZE) {
      await createUsersBatch(i, Math.min(i + BATCH_SIZE, 10000));
      console.log(`Batch processed: Users ${i} to ${i + BATCH_SIZE - 1}`);
    }

    const adminExists = await User.getUserByLogin("admin");
    if (!adminExists) {
      await addAdminUser();
    }

    console.log("DB populated");
  } catch (err) {
    console.error("Error populating DB:", err);
  }
};

export default populateDB;
