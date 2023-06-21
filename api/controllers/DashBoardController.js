/**
 * DashBoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getDataForDashBoard: async (req, res) => {
    try {
      const countTicket = await Tickets.count();
      const countBills = await Bills.count();

      const totalMoney = await Bills.calculateTotal();
      const totalMoneyEachMonth = await Bills.calculateTotalMoneyPerMonth();

      res.status(200).json({
        errorCode: 0,
        data: {
          countTicket: countTicket,
          countBills: countBills,
          totalMoney: totalMoney,
          totalMoneyEachMonth: totalMoneyEachMonth,
        },
      });
    } catch (error) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: error,
      });
    }
  },
  getDataforTicketManager: async (req , res) => {
    try {
      let count = await await Tickets.count();
      const count100kTickets = await Tickets.count({ cost: "100000" });
      const count120kTickets = await Tickets.count({ cost: "120000" });
      res.status(200).json({
        errorCode: 0,
        data: {
          count: count,
          countNomalTickets: count100kTickets,
          countVipTickets: count120kTickets,
        },
      });

    } catch (error) {
      res.status(500).json({
        errorCode: 500,
        errorMessage: "meet error",
        errorDetails: error,
      });
    }
  },
};
