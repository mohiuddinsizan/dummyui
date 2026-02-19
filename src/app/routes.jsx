import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MyCourses from "../pages/MyCourses.jsx";
import CourseDetail from "../pages/CourseDetail.jsx";
import SubjectDetail from "../pages/SubjectDetail.jsx";
import ChapterDetail from "../pages/ChapterDetail.jsx";
import TestSetup from "../pages/TestSetup.jsx";
import TestRunner from "../pages/TestRunner.jsx";

export const appRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/my-courses", element: <MyCourses /> },

  { path: "/my-courses/:courseId", element: <CourseDetail /> },
  { path: "/my-courses/:courseId/subjects/:subjectId", element: <SubjectDetail /> },
  {
    path: "/my-courses/:courseId/subjects/:subjectId/chapters/:chapterId",
    element: <ChapterDetail />,
  },

  // Test flow
{ path: "/test/setup", element: <TestSetup /> },
{ path: "/test/run", element: <TestRunner /> },

];
