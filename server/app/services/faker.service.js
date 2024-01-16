import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import { cryptPassword } from "./password.service.js";
import { UserSetting } from "../models/user-settings.model.js";
import crypto from "crypto";

function sha256(data) {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash("sha256");

      hash.update(Buffer.from(data));

      const digest = hash.digest("hex");

      resolve(digest);
    } catch (error) {
      reject(error);
    }
  });
}

async function createRandomUser() {
  const login = faker.helpers.unique(faker.internet.userName);
  const hashedPassword = await sha256(login);
  const password = await cryptPassword(hashedPassword);
  const name = faker.name.firstName();
  const surname = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [name, surname]);
  const dateOfBirth = faker.date.birthdate({ min: 18 });

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

async function fillRandomUserProfile() {
  const bioLength = faker.datatype.number({ min: 1, max: 3 });
  const bio = faker.lorem.sentences(bioLength);
  const gender = faker.name.sex() === "male" ? "m" : "f";

  const verified = true;
  const onboarded = true;
  const isOnline = faker.datatype.boolean();
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

  const tagsNb = faker.datatype.number({ min: 1, max: 5 });
  const randomsTags = faker.helpers.unique(() =>
    faker.random.words(tagsNb).split(" ")
  );
  const tags = randomsTags.map((tag) => {
    return tag;
  });

  // Corresponds to 96 boulevard bessières, 75017 Paris
  const centerCoords = { lat: 48.89639, lng: 2.31845 };

  // Generate a random point within 100km of the center coordinates
  const { latitude, longitude } = generateRandomPoint(centerCoords, 100);
  const coordinate = { x: longitude, y: latitude };

  return {
    bio,
    gender,
    verified,
    onboarded,
    isOnline,
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
  };
}

function fillRandomUserSettings(login) {
  const ageMin = faker.datatype.number({ min: 18, max: 54 });
  const ageMax = faker.datatype.number({ min: ageMin, max: 55 });
  const distMin = faker.datatype.number({ min: 0, max: 99 });
  const distMax = faker.datatype.number({ min: distMin, max: 100 });
  const fameMin = faker.datatype.number({ min: 0, max: 99 });
  const fameMax = faker.datatype.number({ min: fameMin, max: 100 });

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
  const adminUser = await createRandomUser();
  adminUser.login = "admin";
  const hashedPassword = await sha256("admin");
  adminUser.password = await cryptPassword(hashedPassword);

  const adminProfile = await fillRandomUserProfile();
  adminProfile.prefMale = true;
  adminProfile.prefFemale = true;
  adminProfile.prefEnby = true;

  const newUser = await User.create(adminUser);
  try {
    await User.updateByLogin(newUser.login, adminProfile);
  } catch (err) {
    console.log(err);
  }

  const userSettings = {
    userLogin: newUser.login,
    ageMin: 18,
    ageMax: 99,
    distMin: 0,
    distMax: 100,
    fameMin: 0,
    fameMax: 100,
  };
  await UserSetting.create(userSettings);
  console.log("Admin user created");
};

const populateDB = async () => {
  console.log("Populating DB");
  const userCount = await User.count();

  console.log(`Current user count: ${userCount}`);
  for (let i = userCount; i < 300; i++) {
    const user = await createRandomUser();
    const userProfile = await fillRandomUserProfile();

    const newUser = await User.create(user);
    try {
      await User.updateByLogin(newUser.login, userProfile);
    } catch (err) {
      console.log(err);
    }

    const userSettings = fillRandomUserSettings(newUser.login);
    await UserSetting.create(userSettings);
    console.log(`User ${i} created. Login: ${newUser.login}`);
  }

  // Check if there's "admin" user
  const admin = await User.getUserByLogin("admin");
  if (!admin) {
    await addAdminUser();
  }

  console.log("DB populated");
};

export default populateDB;
