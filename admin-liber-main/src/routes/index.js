import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";
import UserList from "../pages/Users";
import UserDetails from "../pages/UserDetail";
import Transactions from "../pages/Transactions";
import Categories from "../pages/Categories";
import Books from "../pages/Books";
import Orders from "../pages/Orders";
import Recomendations from "../pages/Recomendations";
import BookContent from "../pages/Books/BookContent";
import BookCreate from "../pages/Books/BookCreate";
import BookUpdate from "../pages/Books/BookUpdate";

const authProtectedRoutes = [
  //Kanban Board
  // { path: "/kanban-board", component: KanbanBoard },

  // // Tables
  // { path: "/basic-tables", component: BasicTables },
  // { path: "/datatable-table", component: DatatableTables },
  // { path: "/responsive-table", component: ResponsiveTables },
  // { path: "/editable-table", component: EditableTables },

  // // Ui
  // { path: "/ui-alerts", component: UiAlert },
  // { path: "/ui-buttons", component: UiButtons },
  // { path: "/ui-cards", component: UiCards },
  // { path: "/ui-carousel", component: UiCarousel },
  // { path: "/ui-dropdowns", component: UiDropdown },
  // { path: "/ui-general", component: UiGeneral },
  // { path: "/ui-grid", component: UiGrid },
  // { path: "/ui-images", component: UiImages },
  // { path: "/ui-lightbox", component: UiLightbox },
  // { path: "/ui-modals", component: UiModal },
  // { path: "/ui-progressbars", component: UiProgressbar },
  // { path: "/ui-sweet-alert", component: UiSweetAlert },
  // { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  // { path: "/ui-typography", component: UiTypography },
  // { path: "/ui-video", component: UiVideo },
  // { path: "/ui-session-timeout", component: UiSessionTimeout },
  // { path: "/ui-rating", component: UiRating },
  // { path: "/ui-rangeslider", component: UiRangeSlider },
  // { path: "/ui-notifications", component: UiNotifications },
  // { path: "/ui-roundslider", component: UIRoundSlider },

  // // Forms
  // { path: "/form-elements", component: FormElements },
  // { path: "/form-advanced", component: FormAdvanced },
  // { path: "/form-editors", component: FormEditors },
  // { path: "/form-mask", component: FormMask },
  // { path: "/form-file-upload", component: FormUpload },
  // { path: "/form-wizard", component: FormWizard },
  // { path: "/form-validation", component: FormValidations },
  // { path: "/form-xeditable", component: FormXeditable },

  // //Utility
  // { path: "/starter", component: StarterPage },
  // { path: "/timeline", component: Timeline },
  // { path: "/faqs", component: FAQs },
  // { path: "/pricing", component: Pricing },

  // //Icons
  // { path: "/icons-remix", component: RemixIcons },
  // { path: "/material-design", component: MaterialDesign },
  // { path: "/dripicons", component: DripiIcons },
  // { path: "/font-awesome-5", component: FontAwesome },

  // // Maps
  // { path: "/google-maps", component: MapsGoogle },
  // { path: "/vector-maps", component: MapsVector },

  // //Charts
  // { path: "/apex-charts", component: ChartApex },
  // { path: "/chartjs", component: ChartjsChart },
  // { path: "/charts-sparkline", component: SparklineChart },
  // { path: "/charts-knob", component: ChartsKnob },

  // //Email
  // { path: "/email-inbox", component: EmailInbox },
  // { path: "/email-read", component: EmailRead },

  // //Ecommerce

  // { path: "/ecommerce-products", component: EcommerceProducts },
  { path: "/ecommerce-product-detail/:id", component: EcommerceProductDetail },
  // { path: "/ecommerce-orders", component: EcommerceOrders },
  // { path: "/ecommerce-customers", component: EcommerceCustomers },
  // { path: "/ecommerce-cart", component: EcommerceCart },
  // { path: "/ecommerce-checkout", component: EcommerceCheckout },
  // { path: "/ecommerce-shops", component: EcommerceShops },
  // { path: "/ecommerce-add-product", component: EcommerceAddProduct },

  // //chat
  // { path: "/chat", component: Chat },

  // //calendar
  // { path: "/calendar", component: Calendar },
  { path: "/transactions", component: Transactions },
  { path: "/dashboard", component: Dashboard },
  { path: "/books", component: Books },
  { path: "/book/create", component: BookCreate },
  { path: "/book/update/:id", component: BookUpdate },
  { path: "/book/:id", component: BookContent },
  { path: "/users", component: UserList },
  { path: "/categories", component: Categories },
  { path: "/orders", component: Orders },
  { path: "/user/:id", component: UserDetails },

  { path: "/recommendation", component: Recomendations },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/lock-screen", component: AuthLockScreen },

  // Authentication Inner
  { path: "/404", component: Error404 },
  { path: "/500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
