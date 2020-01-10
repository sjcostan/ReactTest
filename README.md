# ReactTest

Please clone this repo and checkout a new branch for your answer and submit it as a pull request

Use this endpoints as reference for the CRUD implemented in (ReactJS or React Native)

(All) GET: https://intense-stream-35672.herokuapp.com/destinations
	Payload: none
(Single) GET: https://intense-stream-35672.herokuapp.com/destinations/{_id}
	Payload: none
POST: https://intense-stream-35672.herokuapp.com/destinations
	payload: {
		name: (string),
		temperature: (string),
location: (string),
height: (integer),
difficulty: (integer),
about: (string),
duration: (integer),
water: (integer),
image: (string of URI)
}
PUT:  https://intense-stream-35672.herokuapp.com/destinations/{_id}
	payload: {
		name: (string),
		temperature: (string),
location: (string),
height: (integer),
difficulty: (integer),
about: (string),
duration: (integer),
water: (integer),
image: (string of URI)
}
DEL:  https://intense-stream-35672.herokuapp.com/destinations/{_id}
	Payload: none
