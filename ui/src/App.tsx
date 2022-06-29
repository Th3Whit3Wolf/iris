import { Header, Footer, Body } from "#components";
import { Instructor, Login, Student } from "#pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<Router basename={`${process.env.PUBLIC_URL}/`}>
			<Header />
			<Body>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/student" element={<Student />} />
					<Route path="/instructor" element={<Instructor />} />
					<Route path="*" element={<Login />} />
				</Routes>
			</Body>
			<Footer />
		</Router>
	);
};

export default App;
