import groovy.json.*

System.out.println('jsonRenderer init started...')

binding {
}

routes {
}

before {
}

after {
	// render as json only when this attribute is set to groovy truth
	if(request.renderAsJson){
		// sets the json
		response.contentType = 'application/json'
		// result is stored in 'result' closure variable
		if(result instanceof Map && result?.status){
			// set the status from the status map value
			response.status = result.remove('status') as int
		}
		// render the result
		JsonBuilder json = new JsonBuilder()
		json result
		json.writeTo(response.writer)
	}
}

System.out.println('jsonRenderer init finished...')