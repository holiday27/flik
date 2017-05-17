//Entity
entities {
	id
	name
	messages {
		id
		content
		replies {
			id
			content
		}
	}
}
// Message
messages {
	content
	replies {
		id
		content
	}
	entities {
		id
		name
	}
}
