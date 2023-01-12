const filterData = (queryStr, filterParameter) => {
  const { lte, gte } = filterParameter;
  // console.log(filterParameter);

  //This Condition Only For Price Filter
  if (filterParameter.category === "" && lte && gte) {
    // console.log("Price Run");
    return queryStr.find({
      $and: [{ rate: { $gte: gte } }, { rate: { $lte: lte } }],
    });
  }

  //This Condition For Price And Category Filter
  else if (filterParameter.category !== "" && lte && gte) {
    const categories = filterParameter.category.split(",");
    // console.log("Price And Category Run", categories, gte, lte);
    return queryStr.find({
      $and: [
        { rate: { $gte: gte } },
        { rate: { $lte: lte } },
        { category: { $in: categories } },
      ],
    });
  }
  //This Condition For Keyword Search
  else if (filterParameter.keyword != undefined) {
    return queryStr.find({
      name: { $regex: filterParameter.keyword, $options: "i" },
    });
  } else {
    return queryStr;
  }
};

module.exports = { filterData };
