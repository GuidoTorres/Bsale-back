const pages = (query) => {
  const pageAsNumber = Number.parseInt(query.page);
  let page = 0;

  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  return Number(page);
};

const sizes = (query) => {
  const sizeAsNumber = Number.parseInt(query.size);

  let size = 10;
  if (!Number.isNaN(sizeAsNumber && sizeAsNumber > 0 && size < 12)) {
    size = sizeAsNumber;
  }

  return Number(size);
};

module.exports = { pages, sizes };
