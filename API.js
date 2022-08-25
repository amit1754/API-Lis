import { UserContact } from "../../models/contactsync";
import { userstatus } from "../../models/user-status_Model";

async getDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let saveResponse = await UserContact.find(
        { id },
        { contactId: 1, phones: 1 }
      );
      let status = await userstatus.find(
        {},
        { status: 1, timestamps: 1, paginate: 1 }
      );
      if (saveResponse) {
        res.status(200).json({
          success: true,
          message: "Get Successes",
          data: saveResponse,
          status,
        });
      } else {
        throw new Error();
      }
    } catch (error: any) {
      console.log("error", error);
      return logError(error, req, res);
    }
  }
  async getMobileNo(req: Request, res: Response) {
    try {
      const { ph_no } = req.body;
      if (ph_no) {
        let saveResponse = await UserContact.find({ ph_no: ph_no });
        let statusData = await userstatus.find({}, { status: 1 });
        const payload = {
          dataSave: saveResponse,
          statusData,
        };
        if (payload) {
          res.status(200).json({
            success: true,
            message: "Get Successes",
            data: payload,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Phone number is wrong",
        });
      }
    } catch (error: any) {
      console.log("error", error);
      return logError(error, req, res);
    }
  }
 