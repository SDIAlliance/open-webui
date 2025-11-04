import { WEBUI_API_BASE_URL } from '$lib/constants';
import { getTimeRange } from '$lib/utils';

export const createNewChat = async (token: string, chat: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/new`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			chat: chat
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const importChat = async (
	token: string,
	chat: object,
	meta: object | null,
	pinned?: boolean,
	folderId?: string | null
) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/import`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			chat: chat,
			meta: meta ?? {},
			pinned: pinned,
			folder_id: folderId
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getChatList = async (token: string = '', page: number | null = null) => {
	let error = null;
	const searchParams = new URLSearchParams();

	if (page !== null) {
		searchParams.append('page', `${page}`);
	}

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/?${searchParams.toString()}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

export const getChatListByUserId = async (
	token: string = '',
	userId: string,
	page: number = 1,
	filter?: object
) => {
	let error = null;

	const searchParams = new URLSearchParams();

	searchParams.append('page', `${page}`);

	if (filter) {
		Object.entries(filter).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				searchParams.append(key, value.toString());
			}
		});
	}

	const res = await fetch(
		`${WEBUI_API_BASE_URL}/chats/list/user/${userId}?${searchParams.toString()}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...(token && { authorization: `Bearer ${token}` })
			}
		}
	)
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

export const getArchivedChatList = async (
	token: string = '',
	page: number = 1,
	filter?: object
) => {
	let error = null;

	const searchParams = new URLSearchParams();
	searchParams.append('page', `${page}`);

	if (filter) {
		Object.entries(filter).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				searchParams.append(key, value.toString());
			}
		});
	}

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/archived?${searchParams.toString()}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

export const getAllChats = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/all`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getChatListBySearchText = async (token: string, text: string, page: number = 1) => {
	let error = null;

	const searchParams = new URLSearchParams();
	searchParams.append('text', text);
	searchParams.append('page', `${page}`);

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/search?${searchParams.toString()}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

export const getChatsByFolderId = async (token: string, folderId: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/folder/${folderId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getAllArchivedChats = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/all/archived`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getAllUserChats = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/all/db`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getAllTags = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/all/tags`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getPinnedChatList = async (token: string = '') => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/pinned`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

export const getChatListByTagName = async (token: string = '', tagName: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/tags`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: tagName
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

export const getChatById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err.detail;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getChatByShareId = async (token: string, share_id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/share/${share_id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getChatPinnedStatusById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/pinned`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			if ('detail' in err) {
				error = err.detail;
			} else {
				error = err;
			}

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const toggleChatPinnedStatusById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/pin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			if ('detail' in err) {
				error = err.detail;
			} else {
				error = err;
			}

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const cloneChatById = async (token: string, id: string, title?: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/clone`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			...(title && { title: title })
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			if ('detail' in err) {
				error = err.detail;
			} else {
				error = err;
			}

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const cloneSharedChatById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/clone/shared`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			if ('detail' in err) {
				error = err.detail;
			} else {
				error = err;
			}

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const shareChatById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/share`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateChatFolderIdById = async (token: string, id: string, folderId?: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/folder`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			folder_id: folderId
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const archiveChatById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/archive`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const deleteSharedChatById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/share`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateChatById = async (token: string, id: string, chat: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			chat: chat
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const deleteChatById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err.detail;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getTagsById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/tags`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const addTagById = async (token: string, id: string, tagName: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/tags`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: tagName
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err.detail;
			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const deleteTagById = async (token: string, id: string, tagName: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/tags`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: tagName
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
export const deleteTagsById = async (token: string, id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/tags/all`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const deleteAllChats = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err.detail;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const archiveAllChats = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chats/archive/all`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err.detail;

			console.error(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export interface FootprintData {
	// Legacy fields for UI compatibility (formatted as strings)
	energyUse: string;
	waterUse: string;
	resourceUse: string;
	co2Operational: string;
	co2Embedded: string;

	// Raw API response fields (complete data)
	incomplete?: boolean;
	averageCpuUtilization?: number;
	averageServerPowerForPod?: number;
	totalEnergyConsumptionForPod?: number; // in Wh
	gridRenewablePercentageAverage?: number;
	totalRenewableEnergyConsumption?: number; // in Wh
	totalNonRenewableEnergyConsumption?: number; // in Wh
	totalOperationalCo2Emissions?: number; // in grams
	facilityEmbodiedImpactsAttributable?: {
		climate_change?: number;
		ozone_depletion?: number;
		human_toxicity?: number;
		photochemical_oxidant_formation?: number;
		particulate_matter_formation?: number;
		ionizing_radiation?: number;
		terrestrial_acidification?: number;
		freshwater_eutrophication?: number;
		marine_eutrophication?: number;
		terrestrial_ecotoxicity?: number;
		freshwater_ecotoxicity?: number;
		marine_ecotoxicity?: number;
		agricultural_land_occupation?: number;
		urban_land_occupation?: number;
		natural_land_transformation?: number;
		water_depletion?: number;
		metal_depletion?: number;
		fossil_depletion?: number;
	};
	serverEmbodiedImpactsAttributable?: {
		climate_change?: number;
		primary_energy_use?: number;
		ozone_depletion?: number;
		human_toxicity?: number;
		photochemical_oxidant_formation?: number;
		particulate_matter_formation?: number;
		ionizing_radiation?: number;
		terrestrial_acidification?: number;
		freshwater_eutrophication?: number;
		marine_eutrophication?: number;
		terrestrial_ecotoxicity?: number;
		freshwater_ecotoxicity?: number;
		marine_ecotoxicity?: number;
		agricultural_land_occupation?: number;
		urban_land_occupation?: number;
		natural_land_transformation?: number;
		abiotic_depletion_potential?: number;
	};
}

export interface FootprintRequest {
	start_time: number;
	end_time: number;
	host_id: string;
	model_id: string;
	user_id: string;
	usage?: unknown; // Optional usage info for environmental footprint
}

interface ImpactAPIResponse {
	incomplete: boolean;
	averageCpuUtilization: number;
	averageServerPowerForPod: number;
	totalEnergyConsumptionForPod: number;
	gridRenewablePercentageAverage: number;
	totalRenewableEnergyConsumption: number;
	totalNonRenewableEnergyConsumption: number;
	totalOperationalCo2Emissions: number;
	facilityEmbodiedImpactsAttributable: {
		climate_change?: number;
		[key: string]: number | undefined;
	};
	serverEmbodiedImpactsAttributable: {
		climate_change?: number;
		[key: string]: number | undefined;
	};
}

export const fetchFootprint = async (
	params: FootprintRequest,
	onPolling?: (isPolling: boolean) => void
): Promise<FootprintData> => {
	const MAX_POLL_ATTEMPTS = 20; // Maximum 10 minutes of polling (20 * 30 seconds)
	const POLL_INTERVAL_MS = 30000; // 30 seconds

	try {
		// Import the IMPACT_ENDPOINT and IMPACT_API_KEY constants
		const { IMPACT_ENDPOINT, IMPACT_API_KEY } = await import('$lib/constants');

		if (!IMPACT_ENDPOINT) {
			console.warn('IMPACT_ENDPOINT not configured');
			throw new Error('Impact endpoint not configured');
		}

		if (!IMPACT_API_KEY) {
			console.warn('IMPACT_API_KEY not configured');
			throw new Error('Impact API key not configured');
		}

		// Convert timestamps to Unix seconds (API expects seconds)
		const fromTimestamp = Math.floor(params.start_time / 1000);
		const toTimestamp = Math.floor(params.end_time / 1000);

		// Build the API URL with query parameters
		const url = new URL(IMPACT_ENDPOINT);
		url.searchParams.append('from', fromTimestamp.toString());
		url.searchParams.append('to', toTimestamp.toString());

		// Helper function to fetch data from API
		const fetchData = async (): Promise<ImpactAPIResponse> => {
			const response = await fetch(url.toString(), {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-Api-Key': IMPACT_API_KEY
				}
			});

			if (!response.ok) {
				throw new Error(`API request failed: ${response.status} ${response.statusText}`);
			}

			return await response.json();
		};

		// Helper function to map API response to FootprintData
		const mapResponseToFootprintData = (data: ImpactAPIResponse): FootprintData => {
			// Convert Wh to kWh for energy use (divide by 1000)
			const energyUseKWh = (data.totalEnergyConsumptionForPod / 1000).toFixed(6);

			// CO2 from grams to kg (divide by 1000)
			const co2OperationalKg = (data.totalOperationalCo2Emissions / 1000).toFixed(6);

			// Calculate embedded CO2 from facility and server impacts (both in kg CO2eq)
			const facilityClimateChange = data.facilityEmbodiedImpactsAttributable?.climate_change || 0;
			const serverClimateChange = data.serverEmbodiedImpactsAttributable?.climate_change || 0;
			const co2EmbeddedKg = (facilityClimateChange + serverClimateChange).toFixed(6);

			// Map water depletion from facility embodied impacts (in m³)
			const waterUse = (data.facilityEmbodiedImpactsAttributable?.water_depletion || 0).toFixed(6);

			// Map abiotic depletion (fossil + metal) from server embodied impacts (in kg SB-eq)
			const resourceUse = (data.serverEmbodiedImpactsAttributable?.abiotic_depletion_potential || 0).toFixed(6);

			return {
				// Legacy formatted fields for UI
				energyUse: energyUseKWh,
				waterUse: waterUse,
				resourceUse: resourceUse,
				co2Operational: co2OperationalKg,
				co2Embedded: co2EmbeddedKg,

				// Raw API response fields (complete data for future use)
				incomplete: data.incomplete,
				averageCpuUtilization: data.averageCpuUtilization,
				averageServerPowerForPod: data.averageServerPowerForPod,
				totalEnergyConsumptionForPod: data.totalEnergyConsumptionForPod,
				gridRenewablePercentageAverage: data.gridRenewablePercentageAverage,
				totalRenewableEnergyConsumption: data.totalRenewableEnergyConsumption,
				totalNonRenewableEnergyConsumption: data.totalNonRenewableEnergyConsumption,
				totalOperationalCo2Emissions: data.totalOperationalCo2Emissions,
				facilityEmbodiedImpactsAttributable: data.facilityEmbodiedImpactsAttributable,
				serverEmbodiedImpactsAttributable: data.serverEmbodiedImpactsAttributable
			};
		};

		// Initial fetch
		console.log('Fetching footprint data from:', url.toString());
		let data = await fetchData();

		// Poll if data is incomplete
		let pollAttempts = 0;
		while (data.incomplete && pollAttempts < MAX_POLL_ATTEMPTS) {
			pollAttempts++;
			console.log(
				`Footprint data incomplete, polling again in ${POLL_INTERVAL_MS / 1000}s (attempt ${pollAttempts}/${MAX_POLL_ATTEMPTS})`
			);

			// Notify caller that we're polling
			if (onPolling) {
				onPolling(true);
			}

			// Wait 30 seconds before polling again
			await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

			// Fetch again
			data = await fetchData();
		}

		// Notify caller that polling is done
		if (onPolling) {
			onPolling(false);
		}

		if (data.incomplete) {
			throw new Error(
				`Footprint data still incomplete after ${MAX_POLL_ATTEMPTS} polling attempts`
			);
		}

		console.log('Footprint data complete');
		return mapResponseToFootprintData(data);
	} catch (error) {
		console.error('Failed to fetch footprint data:', error);
		throw error;
	}
};
