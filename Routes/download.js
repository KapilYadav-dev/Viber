const request = require("request");
const cheerio = require("cheerio");
const { info } = require("console");

function doWork(req, res) {
  var data = [];
  url = "https://qdownloader.io/download?url=" + req.query.url;
  request(url, async (error, response, html) => {
    const $ = cheerio.load(html);
    var infoBlock = $(".info");
    var video_img = infoBlock.find("img").attr("src");
    var video_title = infoBlock.find("span").text();
    var video_length = infoBlock.find("div").text();
    var downloadBlock = $(".downloadsTable").eq(0).find("tbody").find("tr");
    downloadBlock.each(function (i, elem) {
      var a = $(this);
      var quality = a.find("td").eq(0).text();
      var format = a.find("td").eq(1).text();
      var size = a.find("td").eq(2).text();
      var download_url = a.find("td").eq(3).find("a").attr("href");
      if (!quality.includes("1080p")) {
        data[i] = {
          quality: quality,
          format: format,
          size: size,
          download_url: download_url,
        };
      }
    });
    data=data.filter(function () {return true;});
    var response = {
      video_img: video_img,
      video_title: video_title,
      video_length: video_length,
      video_data: data,
    };
    res.status(200).send(response);
  });
}
module.exports.doWork = doWork;
