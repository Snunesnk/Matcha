import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import { cryptPassword } from "./password.service.js";

async function createRandomUser() {
  const login = faker.helpers.unique(faker.internet.userName);
  const password = await cryptPassword(faker.internet.password());
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

async function fillRandomUserProfile() {
  const bioLength = faker.datatype.number({ min: 1, max: 3 });
  const bio = faker.lorem.sentences(bioLength);
  const gender = faker.name.sex() === "male" ? "m" : "f";

  const verified = true;
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
    return { bwid: tag };
  });

  const latitude = faker.address.latitude();
  const longitude = faker.address.longitude();

  return {
    bio,
    gender,
    verified,
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
    latitude,
    longitude,
  };
}

const populateDB = async () => {
  console.log("Populating DB");
  for (let i = 0; i < 100; i++) {
    const user = await createRandomUser();
    const userProfile = await fillRandomUserProfile();

    const newUser = await User.create(user);
    await User.updateByLogin(newUser.login, userProfile);
  }
};

export default populateDB;
