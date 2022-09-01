import AbstractService from "./_abstract.service";
import Request from "./request";

class ChartsService extends AbstractService {
	name = 'charts/'

	async gold() {
		try {
			const response = await Request.get(
				`${this.name}gold`
			);

			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	}
}

export default new ChartsService();
