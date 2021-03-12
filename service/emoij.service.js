exports.emoij = function emoij(req, data) {
    var limit = parseInt(req.query.limit ?? 10);
    var keyword = req.query.name ?? null;
    var totalItem = 0;
    var totalPage = 0;
    var currentPage = parseInt(req.query.page ?? 1);
    jsonResult = JSON.parse(data);
    if (keyword) {
        jsonResult = jsonResult.filter(i => i.name.indexOf(keyword) > -1)
    }
    totalItem = jsonResult.length;
    totalPage = Math.ceil(totalItem / limit);
    jsonResult = jsonResult.slice(
        limit * currentPage - limit,
        limit * currentPage
    );
    return {
        limit: limit,
        totalPage: totalPage,
        totalItem: totalItem,
        currentPage: currentPage,
        data: jsonResult,
    }
}