import React, { useEffect } from 'react';
import Landing from './components/layouts/landing';
import Navbar from './components/layouts/navbar';
import './index.css';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Gallery from './components/layouts/pages/gallery';
import AboutUs from './components/layouts/pages/about';
import ContactUs from './components/layouts/pages/contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/routing/PrivateRoute';
import RoleRoute from './components/routing/RoleRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import CreateCourse from './components/course-forms/CreateCourse';
import StudentCourses from './components/courses/StudentCourses';
import EditCourse from './components/course-forms/EditCourse';
import Profiles from './components/profiles/Profiles';
import Admin from './components/dashboard/Admin';
import Student from './components/dashboard/Student';
import Teacher from './components/dashboard/Teacher';
import Profile from './components/profile/Profile';
import Courses from './components/courses/Courses';
import Events from './components/events/events';
import TeacherCourses from './components/courses/TeacherCourses';
import StudentEvents from './components/events/StudentEvents';
import Course from './components/course/Course';
import AdminEvent from './components/Event/AdminEvent';
import CreateEvent from './components/events/CreateEvent';
import Messages from './components/message/Messages';
import SendMessage from './components/message/SendMessage';
import StudentCourse from './components/course/StudentCourse';
import EnrolledStudent from './components/enrolled/EnrolledStudent';
import UploadForm from './components/assignment/UploadForm';
import ViewAssignmentsTeacher from './components/assignment/ViewAssignmentsTeacher';
import ViewUploadedAssignment from './components/assignment/ViewUploadedAssignment';
import ViewUploadedAssignments from './components/assignment/ViewUploadedAssignments';
import AssignmentUploadStudent from './components/assignment-student/AssignmentUploadStudent';
import AssignmentFileStudent from './components/assignment-student/AssignmentFilesStudent';
import UploadAssignmentForm from './components/assignment-student/UploadAssignmentForm';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Footer from './components/layouts/Footer';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path='/' exact component={Landing} />
        <section className='container-fluid' style={{ marginTop: '70px' }}>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/about' component={AboutUs} />
            <Route exact path='/contact' component={ContactUs} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/courses' component={Courses} />
            <PrivateRoute
              exact
              path='/student-courses'
              component={StudentCourses}
            />
            <PrivateRoute
              exact
              path='/teacher-courses'
              component={TeacherCourses}
            />
            <Route exact path='/studentcourse/:id' component={StudentCourse} />
            <Route exact path='/course/:id' component={Course} />
            <Route exact path='/event/:id' component={AdminEvent} />
            <RoleRoute exact path='/admin' role='admin' component={Admin} />
            <RoleRoute
              exact
              path='/student'
              role='student'
              component={Student}
            />
            <RoleRoute
              exact
              path='/teacher'
              role='teacher'
              component={Teacher}
            />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-course'
              component={CreateCourse}
            />
            <PrivateRoute exact path='/editcourse/:id' component={EditCourse} />
            <Route exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/message' component={Messages} />
            <PrivateRoute exact path='/sendmessage' component={SendMessage} />
            <PrivateRoute
              exact
              path='/viewstudent/:id'
              component={EnrolledStudent}
            />
            <Route exact path='/events' component={Events} />
            <Route exact path='/createEvent' component={CreateEvent} />
            <Route exact path='/student-events' component={StudentEvents} />
            <Route exact path='/assigment' component={UploadForm} />
            <Route
              exact
              path='/view-assignments'
              component={ViewAssignmentsTeacher}
            />
            <Route
              exact
              path='/assignment/:id'
              component={ViewUploadedAssignments}
            />
            <Route
              exact
              path='/assignment-submitted/:id/:name'
              component={ViewUploadedAssignment}
            />
            <Route
              exact
              path='/assignments-tosubmit'
              component={AssignmentUploadStudent}
            />
            <Route
              exact
              path='/assignment-tosubmit/:id'
              component={AssignmentFileStudent}
            />
            <Route
              exact
              path='/upload-assignment-student/:id/:name'
              component={UploadAssignmentForm}
            />
          </Switch>
          <div class='push'></div>
        </section>
        <Footer />
      </Router>
    </Provider>
  );
}
