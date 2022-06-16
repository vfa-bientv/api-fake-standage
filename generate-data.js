const { log } = require('console');
const { create } = require('domain');
const faker = require('faker');
const fs = require('fs');
faker.locale = 'vi';

// Random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());
const randomCategoryList = (number) => {
  if (number <= 0) return [];
  const categoryList = [];
  Array.from(new Array(number)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};
const randomCityList = (number) => {
  if (number <= 0) return [];
  const cityList = [];
  Array.from(new Array(number)).forEach(() => {
    const city = {
      id: faker.random.uuid(),
      name: faker.address.streetName(),
      code: faker.address.countryCode(),
      address: faker.address.streetAddress(false),
      ensign: faker.image.transport(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    cityList.push(city);
  });
  return cityList;
};
const randomProductList = (categoryList, number) => {
  if (number <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(number)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),

        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }
  return productList;
};
const randomTransportList = (cityList, number) => {
  if (number <= 0) return [];
  const productList = [];
  for (const city of cityList) {
    Array.from(new Array(number)).forEach(() => {
      var cityTo =
        categoryList[Math.floor(Math.random() * categoryList.length)];
      if (category.id === cityTo.id) return;
      const transport = {
        cityFormId: city.id,
        cityForm: city,
        cityToId: cityTo.id,
        cityTo: cityTo,
        aboutTime: faker.datatype.number(100),
        transportMethodId: '',
        id: faker.random.uuid(),
        thcFee: faker.datatype.number(1000),
        blFee: faker.datatype.number(1000),
        sealFee: faker.datatype.number(1000),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),

        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      transportList.push(transport);
    });
  }
  return productList;
};

// IFFE
(() => {
  const categoryList = randomCategoryList(6);
  const productList = randomProductList(categoryList, 6);
  const cityList = randomCityList(100);
  const db = {
    categories: categoryList,
    products: productList,
    cities: cityList,
    profile: {
      name: 'Po',
    },
  };
  fs.writeFile('db.json', JSON.stringify(db), () => {
    log('Generate data successfully!');
  });
})();
