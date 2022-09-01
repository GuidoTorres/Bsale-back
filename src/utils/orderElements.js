const orderElements = (sortBy) => {
    if (sortBy !== undefined && sortBy == "price_asc") {
      return [["price", "ASC"]];
    } else if (sortBy !== undefined && sortBy == "price_desc") {
      return [["price", "DESC"]];
    } else if (sortBy !== undefined && sortBy == "disc_desc") {
      return [["discount", "DESC"]];
    }
  };
  
  module.exports = orderElements;