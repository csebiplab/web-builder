export const dashboardConfig = {
    sidebarNav: [
        {
            title: "My Profile",
            href: "/dashboard/admin/profile",
            icon: "home",
            permissionName: "My Profile"
        },
        {
            title: "Super User",
            href: "/dashboard/super-user",
            icon: "users",
            submenu: true,
            permissionName: "Users",
            submenus: [
                {
                    title: "Create A User",
                    href: "/dashboard/super-user/add-user",
                    icon: "dessert",
                },
                {
                    title: "Show Users",
                    href: "/dashboard/super-user/show-users",
                    icon: "dessert",
                },
                {
                    title: "Create A Role",
                    href: "/dashboard/super-user/create-role",
                    icon: "dessert",
                },
                {
                    title: "Show Roles",
                    href: "/dashboard/super-user/show-roles",
                    icon: "dessert",
                },
                {
                    title: "Give Permissions",
                    href: "/dashboard/super-user/give-permissions",
                    icon: "dessert",
                },
                {
                    title: "Assign Role",
                    href: "/dashboard/super-user/assign-role",
                    icon: "dessert",
                },
                {
                    title: "Create A Permission",
                    href: "/dashboard/super-user/create-permission",
                    icon: "dessert",
                },
                {
                    title: "Show Permissions",
                    href: "/dashboard/super-user/show-permissions",
                    icon: "dessert",
                },
            ],
        },
        {
            title: "Projects",
            href: "/dashboard/create-project",
            icon: "boxes",
            permissionName: "Projects"
        },
        {
            title: "Pages",
            href: "/dashboard/allpages/home",
            icon: "boxes",
            submenu: true,
            permissionName: "Pages",
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
            permissionName: "SEO",
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
            permissionName: "Blogs",
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
