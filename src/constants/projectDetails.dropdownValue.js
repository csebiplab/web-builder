export const servicesDropDown = [
    { label: "Roofing", value: "Roofing" },
    { label: "Pointing", value: "Pointing" },
    { label: "Sidewalk Repair & Replace", value: "Sidewalk Repair & Replace" },
    { label: "Brown Stone Repair", value: "Brown Stone Repair" },
    { label: "Bathroom Remodeling", value: "Bathroom Remodeling" },
    { label: "Kitchen Remodeling", value: "Kitchen Remodeling" },
    { label: "Water Proofing", value: "Water Proofing" },
    { label: "Brick Works", value: "Brick Works" },
    { label: "Power Wash", value: "Power Wash" },
    { label: "Siding & Masonry Work", value: "Siding & Masonry Work" },
    { label: "Painting", value: "Painting" },
    { label: "Sheetrock", value: "Sheetrock" },
    { label: "Plastering", value: "Plastering" },
    { label: "Electrical", value: "Electrical" },
    { label: "Plumbing", value: "Plumbing" },
];

export const serviceWithCompanyName = [
    {
        label: "Roofing Service in RH Construction",
        value: "Roofing Service in RH Construction",
    },
    {
        label: "Pointing Service in RH Construction",
        value: "Pointing Service in RH Construction",
    },
    {
        label: "Sidewalk Repair & Replace Service in RH Construction",
        value: "Sidewalk Repair & Replace Service in RH Construction",
    },
    {
        label: "Brown Stone Repair Service in RH Construction",
        value: "Brown Stone Repair Service in RH Construction",
    },
    {
        label: "Bathroom Remodeling Service in RH Construction",
        value: "Bathroom Remodeling Service in RH Construction",
    },
    {
        label: "Kitchen Remodeling Service in RH Construction",
        value: "Kitchen Remodeling Service in RH Construction",
    },
    {
        label: "Water Proofing Service in RH Construction",
        value: "Water Proofing Service in RH Construction",
    },
    {
        label: "Brick Works Service in RH Construction",
        value: "Brick Works Service in RH Construction",
    },
    {
        label: "Power Wash Service in RH Construction",
        value: "Power Wash Service in RH Construction",
    },
    {
        label: "Siding & Masonry Work Service in RH Construction",
        value: "Siding & Masonry Work Service in RH Construction",
    },
    {
        label: "Painting Service in RH Construction",
        value: "Painting Service in RH Construction",
    },
    {
        label: "Sheetrock Service in RH Construction",
        value: "Sheetrock Service in RH Construction",
    },
    {
        label: "Plastering Repair Service in RH Construction",
        value: "Plastering Repair Service in RH Construction",
    },
    {
        label: "Electrical Service in RH Construction",
        value: "Electrical Service in RH Construction",
    },
    {
        label: "Plumbing Service in RH Construction",
        value: "Plumbing Service in RH Construction",
    },
];

export const projectTypes = [
    { label: "Interior", value: "Interior" },
    { label: "Exterior", value: "Exterior" },
];

export const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return years;
}

export const projectPeriods = [
    {
        label: "Before",
        value: "Before",
    },
    {
        label: "Project Time",
        value: "Project Time",
    },
    {
        label: "After",
        value: "After",
    },
]