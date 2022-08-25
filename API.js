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
 

  ==============================================================

  import { demoModel, faqsModel } from '../models';
import { demoService, assessmentService } from '../mongoServices';

const create = async (req, res) => {
	try {
		const data = {
			...req.body,
		};
		const Model = await demoModel(data);
		const saveResponse = Model.save();
		if (saveResponse) {
			res.status(200).json({
				success: true,
				data: [data],
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'data is not found 400',
		});
	}
};
const get = async (req, res) => {
	try {
		const data = await demoModel.find({}, { Description: 1 });
		const newData = await faqsModel.find({}, { question: 1 });
		const payload = {
			demoDetail: [data],
			faqsDetail: [newData],
		};
		if (data) {
			res.status(200).json({
				success: true,
				message: 'data found',
				data: [payload],
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'data is not found 400',
		});
	}
};
const getById = async (req, res) => {
	try {
		const { id, _id } = req.body;
		if (id) {
			const data = await demoModel.find({}, { title: 1, Description: 1 });
			if (_id) {
				const newData = await faqsModel.findOne({}, { question: 1, answer: 1 });
				const payload = {
					demoDetail: data,
					faqsDetail: newData,
				};
				if (data) {
					res.status(200).json({
						success: true,
						message: 'data found',
						data: [payload],
					});
				}
			}
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'data is not found 400',
		});
	}
};
export default {
	create,
	get,
	getById,
};
