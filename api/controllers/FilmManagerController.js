/**
 *
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const seatsData = require("../../assets/seats.json");

module.exports = {
  createNewDocFilmMamager: async (req, res) => {
    const formData = req.body;
    try {
      const newFilmManager = await FilmManager.create(req.body).fetch();
      const newFilmManagerId = newFilmManager?.id;

      let danhSachGhe = seatsData?.danhSachGhe;

      const newSeatManager = await SeatManager.create({
        filmManagerId: newFilmManagerId,
        seatInformation: danhSachGhe,
      }).fetch();

      res.status(200).json(newSeatManager);
    } catch (error) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: error,
      });
    }
  },
  deleteDocFilmManager: async (req, res) => {
    const idDelete = req.params.id;
    try {
      await FilmManager.destroy({ id: idDelete });
      await SeatManager.destroy({ filmManagerId: idDelete });
      res.status(200).json({
        errorCode: 0,
        message: "delete successfully",
      });
    } catch (error) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: error,
      });
    }
  },

  getDataBaseOnFilmId: async (req, res) => {
    try {
      const { filmId } = req.body;

      const filmsWithId = await FilmManager.find()
        .where({ "filmInfor.id": filmId })
        .meta({ enableExperimentalDeepTargets: true });

      res.status(200).json(filmsWithId);
    } catch (err) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: err,
      });
    }
  },
  getSeatDataBaseOnFilmManagerId: async (req, res) => {
    try {
      const { filmManagerId } = req.params;
  
      const seatManagerInfor = await SeatManager.find({
        filmManagerId: filmManagerId,
      });
      let seatInformation = seatManagerInfor[0]?.seatInformation
      const filmManagerInfor = await FilmManager.findOne({ id: filmManagerId });
  
      let result = {
        thongTinPhim: {
          maLichChieu: filmManagerInfor.id,
          tenCumRap: "CGV CINEMA.",
          tenRap: `Rạp ${filmManagerInfor.theaterNumber}`,
          diaChi: filmManagerInfor.theaterAddress,
          tenPhim: filmManagerInfor.filmInfor.name,
          hinhAnh:
            "https://drive.google.com/uc?export=view&id=1lmqBHEVus2vQRkaDBg8LCB-sgZHN6gu7",
          ngayChieu: filmManagerInfor.watchDate,
          gioChieu: filmManagerInfor.watchTime,
        },
        danhSachGhe : seatInformation
      };
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: err,
      });
    }
  }
};


