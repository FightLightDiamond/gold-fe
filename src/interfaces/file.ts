export interface IFile {
	name: string,
	size: string
}

interface item {
	id: number
	status: number
	user_id: number
}

interface itemLocation {
	user_id: number
	item_id: number
	status: number // NO_SELECT; SELECTED; DONE;
	x: number
	y: number
}

if (status === 'NO_SELECT') {
	// can select
	//itemLocation.status = 'SELECTED'
	//itemLocation.item_id = item_id
}

const move = (item: any, x: number, y: number) => {
	if (status === 'SELECTED') {
		item.x = x
		item.y = y
	}
}

const onDone = {
	//itemLocation.status = DONE
}