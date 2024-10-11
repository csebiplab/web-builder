export const dashboardConfig = {
    sidebarNav: [
        {
            title: "My Profile",
            href: "/dashboard/admin/profile",
            icon: "home",
        },
        {
            title: "Users",
            href: "/dashboard/user-management",
            icon: "users",
            submenu: true,
            submenus: [
                {
                    title: "Show Users",
                    href: "/dashboard/user-management/show-users",
                    icon: "dessert",
                },
                {
                    title: "Create A User",
                    href: "/dashboard/user-management/create-user",
                    icon: "dessert",
                },
                {
                    title: "Show Roles",
                    href: "/dashboard/user-management/show-roles",
                    icon: "dessert",
                },
                {
                    title: "Create A Role",
                    href: "/dashboard/user-management/create-role",
                    icon: "dessert",
                },
                {
                    title: "Show Permissions",
                    href: "/dashboard/user-management/show-permissions",
                    icon: "dessert",
                },
                {
                    title: "Create A Permission",
                    href: "/dashboard/user-management/create-permission",
                    icon: "dessert",
                },
            ],
        },
        {
            title: "Pages",
            href: "/dashboard/allpages/home",
            icon: "boxes",
            submenu: true,
            submenus: [
                {
                    title: "Create Metadata",
                    href: "/dashboard/allpages/create-all-pages-metadata",
                    icon: "dessert",
                },
                {
                    title: "Show All Metadata",
                    href: "/dashboard/allpages/see-all-page-metadata",
                    icon: "dessert",
                },

            ],
        },
        {
            title: "Seo",
            href: "/dashboard/siteVerification",
            icon: "boxes",
            submenu: true,
            submenus: [
                {
                    title: "Site Verification",
                    href: "/dashboard/siteVerification",
                    icon: "dessert",
                },
                {
                    title: "Sitemap",
                    href: "/dashboard/siteMap",
                    icon: "dessert",
                },
                {
                    title: "RobotTXT",
                    href: "/dashboard/robottxt",
                    icon: "dessert",
                },
            ],
        },
        {
            title: "Blogs",
            href: "/dashboard/blogs",
            icon: "boxes",
            submenu: true,
            submenus: [
                {
                    title: "All Blog",
                    href: "/dashboard/blogs",
                    icon: "dessert",
                },
                {
                    title: "Add New",
                    href: "/dashboard/blogs/addNew",
                    icon: "dessert",
                },
            ],
        },
    ],
};
