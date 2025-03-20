"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const account_module_1 = require("./account/account.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const banner_module_1 = require("./banner/banner.module");
const blogs_module_1 = require("./blogs/blogs.module");
const category_module_1 = require("./category/category.module");
const company_details_module_1 = require("./company-details/company-details.module");
const contact_us_module_1 = require("./contact-us/contact-us.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const email_subscribers_module_1 = require("./email-subscribers/email-subscribers.module");
const login_history_module_1 = require("./login-history/login-history.module");
const menus_module_1 = require("./menus/menus.module");
const notifications_module_1 = require("./notifications/notifications.module");
const pages_module_1 = require("./pages/pages.module");
const permissions_module_1 = require("./permissions/permissions.module");
const search_history_module_1 = require("./search-history/search-history.module");
const settings_module_1 = require("./settings/settings.module");
const user_details_module_1 = require("./user-details/user-details.module");
const user_permissions_module_1 = require("./user-permissions/user-permissions.module");
const state_module_1 = require("./state/state.module");
const city_module_1 = require("./city/city.module");
const area_module_1 = require("./area/area.module");
const company_category_module_1 = require("./company-category/company-category.module");
const company_sub_category_module_1 = require("./company-sub-category/company-sub-category.module");
const company_keyword_module_1 = require("./company-keyword/company-keyword.module");
const company_image_module_1 = require("./company-image/company-image.module");
const leed_module_1 = require("./leed/leed.module");
const company_schedule_module_1 = require("./company-schedule/company-schedule.module");
const call_history_module_1 = require("./call-history/call-history.module");
const banner_category_module_1 = require("./banner-category/banner-category.module");
const class_module_1 = require("./class/class.module");
const student_module_1 = require("./student/student.module");
const staff_details_module_1 = require("./staff-details/staff-details.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.BL_DB_HOST,
                port: Number(process.env.BL_DB_PORT),
                username: process.env.BL_USER_NAME,
                password: process.env.BL_DB_PASS,
                database: process.env.BL_DB_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            account_module_1.AccountModule,
            dashboard_module_1.DashboardModule,
            settings_module_1.SettingsModule,
            banner_module_1.BannerModule,
            login_history_module_1.LoginHistoryModule,
            menus_module_1.MenusModule,
            notifications_module_1.NotificationsModule,
            permissions_module_1.PermissionsModule,
            user_permissions_module_1.UserPermissionsModule,
            user_details_module_1.UserDetailsModule,
            category_module_1.CategoryModule,
            company_details_module_1.CompanyDetailsModule,
            pages_module_1.PagesModule,
            search_history_module_1.SearchHistoryModule,
            email_subscribers_module_1.EmailSubscribersModule,
            blogs_module_1.BlogsModule,
            contact_us_module_1.ContactUsModule,
            state_module_1.StateModule,
            city_module_1.CityModule,
            area_module_1.AreaModule,
            company_category_module_1.CompanyCategoryModule,
            company_sub_category_module_1.CompanySubCategoryModule,
            company_keyword_module_1.CompanyKeywordModule,
            company_image_module_1.CompanyImageModule,
            leed_module_1.LeedModule,
            company_schedule_module_1.CompanyScheduleModule,
            call_history_module_1.CallHistoryModule,
            banner_category_module_1.BannerCategoryModule,
            class_module_1.ClassModule,
            student_module_1.StudentModule,
            staff_details_module_1.StaffDetailsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map