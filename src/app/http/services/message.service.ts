import Request from "./request";

const MessageService = {
	get: async () => {
		try {
			const response = await Request.post(
				`messages/`
			);

			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default MessageService;
