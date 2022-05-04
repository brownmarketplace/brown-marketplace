import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography';

function PageBreadcrumbs(props) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {props.path.map((e) =>
                e.href === null
                    ? <Typography
                        color="text.primary"
                        style={{ textTransform: 'capitalize' }}>
                        {e.title}
                    </Typography>
                    : <Link
                        underline="hover"
                        color="inherit"
                        style={{ textTransform: 'capitalize' }}
                        href={e.href}>
                        {e.title}
                    </Link>
            )}
        </Breadcrumbs>
    );
}

PageBreadcrumbs.defaultProps = {
    path: [{ title: "Home", href: "/home" },
    { title: "Category", href: "/category/Animal" },
    { title: "Subcategory", href: "/category/Animal" },
    { title: "Current Page", href: null }],
}

export default PageBreadcrumbs;