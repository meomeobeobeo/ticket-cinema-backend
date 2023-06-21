/**
 * BillsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createNewBills: async (req, res) => {
        try {
          let { filmManagerId, userId, totalCost, listSeats } = req.body;
          const seatManagerInfor = await SeatManager.find({
            filmManagerId: filmManagerId,
          });
          let seatInformation = seatManagerInfor[0]?.seatInformation;
          let upDateseatInformation;
      
          for (let i = 0; i < seatInformation.length; i++) {
            const maGhe = seatInformation[i].maGhe;
            const matchingSeat = listSeats.find(seat => seat.maGhe === maGhe);
            if (matchingSeat) {
              seatInformation[i] = matchingSeat;
            }
          }
      
          // update seatManager document
          let updateSeatManagerRes = await SeatManager.update({
            filmManagerId: filmManagerId,
          }).set({
            ...seatManagerInfor[0],
            seatInformation: seatInformation,
          });
      
          // create document in tickets model
          let createdDocsTickets = []; // Empty array to store created documents model tickets
          for (let value of listSeats) {
            let newDoc = await Tickets.create({
              seatId: value.maGhe,
              cost: value.giaVe,
              filmManagerId: filmManagerId,
              status: 'paid',
            }).fetch();
            createdDocsTickets.push(newDoc.id); // Push the newly created document into the array

          }

          // create bill for users and save in database


          let newBills = await Bills.create({
            listTickets : createdDocsTickets,
            totalCost : totalCost,
            userId : userId,
            status : 'paid'
          })

      
          res.status(200).json({
            errorCode : 0 ,
            message : "Create bill successfully",
            data : newBills
          }); // Return the array of created documents
        } catch (error) {
          res.status(500).json({
            errorCode: 500,
            errorMessage: 'meet error',
            errorDetails: error,
          });
        }
      },
      
};
