export const URLS = {
    home: "/",
    login: "/login",
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
        accademic: {
            courses: {
                base: "/dashboard/academic/courses",
                detail: (courseId: string) => `/dashboard/academic/courses/${courseId}`,
                dynamicPage: (courseId: string, type: string, id: string) => `/dashboard/academic/courses/${courseId}/${type}/${id}`,
            },
        },
    },
};
