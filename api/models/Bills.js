/**
 * Bills.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    listTickets: { type: "ref", defaultsTo: [] }, // _id của danh sách vé
    listFood: { type: "ref", defaultsTo: [] }, // _id của danh sách thức ăn
    totalCost: { type: "number", required: true },
    userId: { type: "string", required: true },
    status: {
      type: "string",
      required: true,
      isIn: ["paid", "unpaid", "delete"],
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  calculateTotal: function () {
    return Bills.sum("totalCost");
  },
  calculateTotalMoneyPerMonth: async function () {
    try {
      const result = await Bills.getDatastore()
        .manager.collection(Bills.tableName)
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(2023, 0, 1),
                $lte: new Date(2023, 11, 31, 23, 59, 59),
              },
            },
          },
          {
            $group: {
              _id: { $month: "$createdAt" },
              totalMoney: { $sum: "$totalCost" },
            },
          },
          {
            $project: {
              month: {
                $switch: {
                  branches: [
                    { case: { $eq: ["$_id", 1] }, then: "January" },
                    { case: { $eq: ["$_id", 2] }, then: "February" },
                    { case: { $eq: ["$_id", 3] }, then: "March" },
                    { case: { $eq: ["$_id", 4] }, then: "April" },
                    { case: { $eq: ["$_id", 5] }, then: "May" },
                    { case: { $eq: ["$_id", 6] }, then: "June" },
                    { case: { $eq: ["$_id", 7] }, then: "July" },
                    { case: { $eq: ["$_id", 8] }, then: "August" },
                    { case: { $eq: ["$_id", 9] }, then: "September" },
                    { case: { $eq: ["$_id", 10] }, then: "October" },
                    { case: { $eq: ["$_id", 11] }, then: "November" },
                    { case: { $eq: ["$_id", 12] }, then: "December" },
                  ],
                  default: "Unknown",
                },
              },
              totalMoney: 1,
            },
          },
        ])
        .toArray();

        let arrCheck = [
          { _id: 1, value: "January" },
          { _id: 2, value: "February" },
          { _id: 3, value: "March" },
          { _id: 4, value: "April" },
          { _id: 5, value: "May" },
          { _id: 6, value: "June" },
          { _id: 7, value: "July" },
          { _id: 8, value: "August" },
          { _id: 9, value: "September" },
          { _id: 10, value: "October" },
          { _id: 11, value: "November" },
          { _id: 12, value: "December" },
        ];
        
        let arrResult = [];
        
        arrCheck.forEach((data) => {
          let found = false;
        
          result.forEach((value) => {
            if (value._id === data._id) {
              arrResult.push(value);
              found = true;
            }
          });
        
          if (!found) {
            arrResult.push({
              _id: data._id,
              totalMoney: 0,
              month: data.value,
            });
          }
        });
        
        
        

      return arrResult;
    } catch (err) {
      console.error(err);
      return;
    }
  },
};
