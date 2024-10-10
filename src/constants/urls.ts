export const URLS = {
    home: "/",
    visionMission: "/vision-mission",
    curriculum: "/curriculum",
    academnic: {
        BASE: "/academic",
        courses: {
            list: "/academic/courses",
            detail: (courseId: string) => `/academic/courses/${courseId}`,
        },
        calendar: "/academic/calendar",
    },
    major: {
        list: "/majors",
        detail: (majorId: string) => `/majors/${majorId}`,
    },
    research: {
        list: "/research",
        detail: (researchId: string) => `/research/${researchId}`,
    },
    dashboard: {
        BASE: "/dashboard",
        schedule: "/dashboard/schedule",
        settings: "/dashboard/settings",
        myCourses: "/dashboard/my-courses",
    },
};
