import app from './app'
import { envVariables } from './config/env'
const port = envVariables.PORT || 5000

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
