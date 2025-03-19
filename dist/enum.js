"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayList = exports.LeedStatus = exports.CategoryType = exports.ProductFileType = exports.BannerType = exports.ADType = exports.LoginType = exports.RatingShortStatus = exports.Feature = exports.YNStatus = exports.NotificationType = exports.PageType = exports.RedirectType = exports.LogType = exports.PermissionAction = exports.ContactUsStatus = exports.QnAStatus = exports.FeedbackStatus = exports.AIType = exports.ReviewStatus = exports.SchoolStatus = exports.DefaultStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["MAIN_ADMIN"] = "MAIN_ADMIN";
    UserRole["SUB_ADMIN"] = "SUB_ADMIN";
    UserRole["STAFF"] = "STAFF";
})(UserRole || (exports.UserRole = UserRole = {}));
var DefaultStatus;
(function (DefaultStatus) {
    DefaultStatus["ACTIVE"] = "ACTIVE";
    DefaultStatus["DEACTIVE"] = "DEACTIVE";
    DefaultStatus["DELETED"] = "DELETED";
    DefaultStatus["SUSPENDED"] = "SUSPENDED";
    DefaultStatus["PENDING"] = "PENDING";
})(DefaultStatus || (exports.DefaultStatus = DefaultStatus = {}));
var SchoolStatus;
(function (SchoolStatus) {
    SchoolStatus["PENDING"] = "PENDING";
    SchoolStatus["ACTIVE"] = "ACTIVE";
    SchoolStatus["INACTIVE"] = "INACTIVE";
})(SchoolStatus || (exports.SchoolStatus = SchoolStatus = {}));
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["ACTIVE"] = "ACTIVE";
    ReviewStatus["DELETED"] = "DELETED";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
var AIType;
(function (AIType) {
    AIType["ACTIVE"] = "ACTIVE";
    AIType["INACTIVE"] = "INACTIVE";
})(AIType || (exports.AIType = AIType = {}));
var FeedbackStatus;
(function (FeedbackStatus) {
    FeedbackStatus["YES"] = "YES";
    FeedbackStatus["NO"] = "NO";
    FeedbackStatus["DELETED"] = "DELETED";
})(FeedbackStatus || (exports.FeedbackStatus = FeedbackStatus = {}));
var QnAStatus;
(function (QnAStatus) {
    QnAStatus["YES"] = "YES";
    QnAStatus["NO"] = "NO";
    QnAStatus["DELETED"] = "DELETED";
})(QnAStatus || (exports.QnAStatus = QnAStatus = {}));
var ContactUsStatus;
(function (ContactUsStatus) {
    ContactUsStatus["PENDING"] = "PENDING";
    ContactUsStatus["REPLIED"] = "REPLIED";
})(ContactUsStatus || (exports.ContactUsStatus = ContactUsStatus = {}));
var PermissionAction;
(function (PermissionAction) {
    PermissionAction["CREATE"] = "Create";
    PermissionAction["READ"] = "Read";
    PermissionAction["UPDATE"] = "Update";
    PermissionAction["DELETE"] = "Delete";
})(PermissionAction || (exports.PermissionAction = PermissionAction = {}));
var LogType;
(function (LogType) {
    LogType["LOGIN"] = "IN";
    LogType["LOGOUT"] = "OUT";
})(LogType || (exports.LogType = LogType = {}));
var RedirectType;
(function (RedirectType) {
    RedirectType["PRODUCT"] = "PRODUCT";
    RedirectType["VENDOR"] = "VENDOR";
})(RedirectType || (exports.RedirectType = RedirectType = {}));
var PageType;
(function (PageType) {
    PageType["TNC"] = "TERMS & CONDITIONS";
    PageType["PRIVACY_POLICY"] = "PRIVACY POLICY";
    PageType["ENQUIRY_DATA_POLICY"] = "ENQUIRY DATA POLICY";
    PageType["DATA_POLICY"] = "DATA POLICY";
    PageType["LISTING_POLICY"] = "LISTING POLICY";
    PageType["ABOUT_APP"] = "ABOUT APP";
})(PageType || (exports.PageType = PageType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["NEW_PRODUCT"] = "NEW PRODUCT";
    NotificationType["NEW_ACCOUNT"] = "NEW ACCOUNT";
    NotificationType["CONTACT_US"] = "CONTACT US";
    NotificationType["QNA"] = "QNA";
    NotificationType["FEEDBACK"] = "FEEDBACK";
    NotificationType["INVOICE"] = "INVOICE";
    NotificationType["STAFF"] = "STAFF";
    NotificationType["TICKET"] = "TICKET";
    NotificationType["PRODUCT"] = "PRODUCT";
    NotificationType["PRODUCT_VIEW"] = "PRODUCT VIEW";
    NotificationType["VENDOR_RATING"] = "VENDOR RATING";
    NotificationType["VENDOR_ACCOUNT"] = "VENDOR ACCOUNT";
    NotificationType["VENDOR_INVOICE"] = "VENDOR INVOICE";
    NotificationType["VENDOR_PAYMENT"] = "VENDOR PAYMENT";
    NotificationType["VENDOR_TICKET"] = "VENDOR TICKET";
    NotificationType["USER_PRODUCT"] = "USER PRODUCT";
    NotificationType["USER_ACCOUNT"] = "USER ACCOUNT";
    NotificationType["USER_INVOICE"] = "USER INVOICE";
    NotificationType["USER_PAYMENT"] = "USER PAYMENT";
    NotificationType["USER_TICKET"] = "USER TICKET";
    NotificationType["OFFER"] = "OFFER";
    NotificationType["LOGIN"] = "LOGIN";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var YNStatus;
(function (YNStatus) {
    YNStatus["All"] = "All";
    YNStatus["YES"] = "Yes";
    YNStatus["NO"] = "No";
})(YNStatus || (exports.YNStatus = YNStatus = {}));
var Feature;
(function (Feature) {
    Feature["TRUE"] = "TRUE";
    Feature["FALSE"] = "FALSE";
})(Feature || (exports.Feature = Feature = {}));
var RatingShortStatus;
(function (RatingShortStatus) {
    RatingShortStatus["ASC"] = "ASC";
    RatingShortStatus["DESC"] = "DESC";
    RatingShortStatus["ALL"] = "ALL";
})(RatingShortStatus || (exports.RatingShortStatus = RatingShortStatus = {}));
var LoginType;
(function (LoginType) {
    LoginType["FACEBOOK"] = "FACEBOOK";
    LoginType["GOOGLE"] = "GOOGLE";
    LoginType["EMAIL"] = "EMAIL";
    LoginType["PHONE"] = "PHONE";
    LoginType["GUEST"] = "GUEST";
})(LoginType || (exports.LoginType = LoginType = {}));
var ADType;
(function (ADType) {
    ADType["ASC"] = "ASC";
    ADType["DESC"] = "DESC";
    ADType["NONE"] = "";
})(ADType || (exports.ADType = ADType = {}));
var BannerType;
(function (BannerType) {
    BannerType["TOP"] = "TOP";
    BannerType["MIDDLE"] = "MIDDLE";
    BannerType["BOTTOM"] = "BOTTOM";
})(BannerType || (exports.BannerType = BannerType = {}));
var ProductFileType;
(function (ProductFileType) {
    ProductFileType["IMAGE"] = "IMAGE";
    ProductFileType["VIDEO"] = "VIDEO";
})(ProductFileType || (exports.ProductFileType = ProductFileType = {}));
var CategoryType;
(function (CategoryType) {
    CategoryType["NORMAL"] = "NORMAL";
    CategoryType["NEW"] = "NEW";
    CategoryType["TRENDING"] = "TRENDING";
})(CategoryType || (exports.CategoryType = CategoryType = {}));
var LeedStatus;
(function (LeedStatus) {
    LeedStatus["NEW"] = "NEW";
    LeedStatus["CALLED"] = "CALLED";
})(LeedStatus || (exports.LeedStatus = LeedStatus = {}));
var DayList;
(function (DayList) {
    DayList["SUNDAY"] = "Sunday";
    DayList["MONDAY"] = "Monday";
    DayList["TUESDAY"] = "Tuesday";
    DayList["WEDNESDAY"] = "Wednesday";
    DayList["THURSDAY"] = "Thursday";
    DayList["FRIDAY"] = "Friday";
    DayList["SATURDAY"] = "Saturday";
})(DayList || (exports.DayList = DayList = {}));
//# sourceMappingURL=enum.js.map