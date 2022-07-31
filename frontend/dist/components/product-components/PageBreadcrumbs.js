import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
function PageBreadcrumbs(props) {
    return (React.createElement(Breadcrumbs, { "aria-label": "breadcrumb" }, props.path.map(function (e, idx) {
        return e.href === null
            ? React.createElement(Typography, { key: idx, color: "text.primary", style: { textTransform: 'capitalize' } }, e.title)
            : React.createElement(Link, { key: idx, underline: "hover", color: "inherit", style: { textTransform: 'capitalize' }, href: e.href }, e.title);
    })));
}
PageBreadcrumbs.defaultProps = {
    path: [{ title: "Home", href: "/home" },
        { title: "Category", href: "/category/Animal" },
        { title: "Subcategory", href: "/category/Animal" },
        { title: "Current Page", href: null }],
};
export default PageBreadcrumbs;
//# sourceMappingURL=PageBreadcrumbs.js.map