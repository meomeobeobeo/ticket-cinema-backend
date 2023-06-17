/**
 *
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getDataBaseOnFilmId: async (req, res) => {

    
    try {
      const { filmId } = req.body;
      
      const filmsWithId = await FilmManager.find().where({ "filmInfor.id": filmId }).meta({ enableExperimentalDeepTargets: true });

      res.status(200).json(filmsWithId);
    } catch (err) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: err,
      });   
    }
  },
};
