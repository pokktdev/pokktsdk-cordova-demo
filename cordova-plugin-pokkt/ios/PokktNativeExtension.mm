#import <string>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Cordova/CDV.h>
#import <PokktSDK/PokktSDK.h>

UIView* bannerContainer;

CDVPlugin *cordovaPlugin = nil;

@interface PokktAdDelegate:NSObject<PokktVideoAdsDelegate, PokktInterstitialDelegate, PokktBannerDelegate, PokktIGADelegate>
@end

#ifdef __cplusplus
extern "C"
{
#endif
    
    /***
     *
     *  CONSTS
     *
     ***/
    
    // operation names
#define     SET_POKKT_CONFIG                @"setPokktConfig"
#define     SET_THIRDPARTY_ID               @"setThirdPartyUserId"
#define     SET_PLAYER_VIEW_CONFIG          @"setAdPlayerViewConfig"
#define     SET_USER_DETAILS                @"setUserDetails"
    
#define     VIDEO_AD_CACHE_REWARDED                     @"VideoAd_cacheRewarded"
#define     VIDEO_AD_CACHE_NON_REWARDED                 @"VideoAd_cacheNonRewarded"
#define     VIDEO_AD_SHOW_REWARDED                      @"VideoAd_showRewarded"
#define     VIDEO_AD_SHOW_NON_REWARDED                  @"VideoAd_showNonRewarded"
#define     VIDEO_AD_CHECK_AVAILABILITY_REWARDED        @"VideoAd_checkAdAvailability_rewarded"
#define     VIDEO_AD_CHECK_AVAILABILITY_NON_REWARDED    @"VideoAd_checkAdAvailability_nonRewarded"
    
#define     INTERSTITIAL_AD_CACHE_REWARDED                      @"Interstitial_cacheRewarded"
#define     INTERSTITIAL_AD_CACHE_NON_REWARDED                  @"Interstitial_cacheNonRewarded"
#define     INTERSTITIAL_AD_SHOW_REWARDED                       @"Interstitial_showRewarded"
#define     INTERSTITIAL_AD_SHOW_NON_REWARDED                   @"Interstitial_showNonRewarded"
#define     INTERSTITIAL_AD_CHECK_AVAILABILITY_REWARDED         @"Interstitial_checkAdAvailability_rewarded"
#define     INTERSTITIAL_AD_CHECK_AVAILABILITY_NON_REWARDED     @"Interstitial_checkAdAvailability_nonRewarded"
    
#define     BANNER_LOAD                     @"Banner_loadBanner"
#define     BANNER_LOAD_WITH_RECT           @"Banner_loadBannerWithRect"
#define     BANNER_DESTROY                  @"Banner_destroyBanner"
#define     BANNER_SHOULD_AUTO_REFRESH      @"Banner_shouldAutoRefresh"
    
#define     IN_GAME_ADS_FETCH_ASSETS        @"InGameAd_fetchAssets"
    
#define     ANALYTICS_SET_DETAILS           @"InGameAd_setAnalyticsDetails"
#define     ANALYTICS_TRACK_IAP             @"InGameAd_trackIAP"
#define     ANALYTICS_NOTIFY_APP_INSTALL    @"InGameAd_notifyAppInstall"
#define     ANALYTICS_UPDATE_IGA_DATA       @"InGameAd_updateIGAData"
    
#define     DEBUGGING_SHOULD_DEBUG          @"Debugging_shouldDebug"
#define     DEBUGGING_EXPORT_LOG            @"Debugging_exportLog"
#define     DEBUGGING_EXPORT_LOG_TO_CLOUD   @"Debugging_exportLogToCloud"
#define     DEBUGGING_SHOW_TOAST            @"Debugging_showToast"
#define     DEBUGGING_SHOW_LOG              @"Debugging_showLog"
    
    
    /***
     *  Pokkt-to-Framework Events
     ***/
    
    //    // Video/Interstitial Ad Delegate
    //#define     AD_CACHING_COMPLETED_EVENT      @"AdCachingCompleted"
    //#define     AD_CACHING_FAILED_EVENT         @"AdCachingFailed"
    //#define     AD_CLOSED_EVENT                 @"AdClosed"
    //#define     AD_COMPLETED_EVENT              @"AdCompleted"
    //#define     AD_FAILED_TO_SHOW_EVENT         @"AdFailedToShow"
    //#define     AD_DISPLAYED_EVENT              @"AdDisplayed"
    //#define     AD_SKIPPED_EVENT                @"AdSkipped"
    //#define     AD_GRATIFIED_EVENT              @"AdGratified"
    //#define     AD_AVAILABILITY_EVENT           @"AdAvailability"
    
    //Video Ad Related Events
#define EVENT_VIDEO_AD_CACHING_COMPLETED                      @"VideoAdCachingCompleted"
#define EVENT_VIDEO_AD_CACHING_FAILED                         @"VideoAdCachingFailed"
#define EVENT_VIDEO_AD_CLOSED                                 @"VideoAdClosed"
#define EVENT_VIDEO_AD_COMPLETED                              @"VideoAdCompleted"
#define EVENT_VIDEO_AD_FAILED_TO_SHOW                         @"VideoAdFailedToShow"
#define EVENT_VIDEO_AD_DISPLAYED                              @"VideoAdDisplayed"
#define EVENT_VIDEO_AD_SKIPPED                                @"VideoAdSkipped"
#define EVENT_VIDEO_AD_GRATIFIED                              @"VideoAdGratified"
#define EVENT_VIDEO_AD_AVAILABILITY                           @"VideoAdAvailability"
    
    //Interstitial Related Events
#define EVENT_INTERSTITIAL_CACHING_COMPLETED                      @"InterstitialCachingCompleted"
#define EVENT_INTERSTITIAL_CACHING_FAILED                         @"InterstitialCachingFailed"
#define EVENT_INTERSTITIAL_CLOSED                                 @"InterstitialClosed"
#define EVENT_INTERSTITIAL_COMPLETED                              @"InterstitialCompleted"
#define EVENT_INTERSTITIAL_FAILED_TO_SHOW                         @"InterstitialFailedToShow"
#define EVENT_INTERSTITIAL_DISPLAYED                              @"InterstitialDisplayed"
#define EVENT_INTERSTITIAL_SKIPPED                                @"InterstitialSkipped"
#define EVENT_INTERSTITIAL_GRATIFIED                              @"InterstitialGratified"
#define EVENT_INTERSTITIAL_AVAILABILITY                           @"InterstitialAvailability"
    
    // Banner Ad Delegate
#define     BANNER_LOADED                   @"BannerLoaded"
#define     BANNER_LOAD_FAILED              @"BannerLoadFailed"
    
    // IGA Delegate
#define     IGA_ASSETS_READY                @"IGAAssetsReady"
#define     IGA_ASSETS_FAILED               @"IGAAssetsFailed"
    
    
    UIViewController* getRootViewController()
    {
        UIViewController *viewController = [[[UIApplication sharedApplication] keyWindow] rootViewController];
        return viewController;
    }
    
    NSDictionary* extractJSON(NSString* jsonString)
    {
        NSError* jsonError;
        NSData* jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary* jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData
                                                                   options:NSJSONReadingMutableContainers
                                                                     error:&jsonError];
        return jsonObject;
    }
    
    PokktIAPDetails* parseIAPDetails(NSString* detailsString)
    {
        NSDictionary* jsonObject = extractJSON(detailsString);
        
        PokktIAPDetails* details = [[PokktIAPDetails alloc] init];
        
        details.productIdentifier = jsonObject[@"productId"];
        details.productPrice = [NSString stringWithFormat:@"%d", [jsonObject[@"price"] intValue]];
        details.productCurrency = jsonObject[@"currencyCode"];
        details.productTitle = jsonObject[@"title"];
        details.productDescription = jsonObject[@"description"];
        
        // TODO
        //detail.setPurchaseData(jsonObject.optString("purchaseData"));
        //detail.setPurchaseSignature(jsonObject.optString("purchaseSignature"));
        //detail.setPurchaseStore(IAPStoreType.valueOf(jsonObject.optString("purchaseStore")));
        
        return details;
    }
    
    PokktAdPlayerViewConfig* getAdPlayerViewConfigFromJSONString(NSString* configString)
    {
        NSDictionary* jsonObject = extractJSON(configString);
        
        PokktAdPlayerViewConfig* config = [[PokktAdPlayerViewConfig alloc] init];
        
        config.shouldAllowSkip = [jsonObject[@"shouldAllowSkip"] boolValue];
        config.defaultSkipTime = [jsonObject[@"defaultSkipTime"] floatValue];
        config.skipConfirmMessage = jsonObject[@"skipConfirmMessage"];
        config.shouldAllowMute = [jsonObject[@"shouldAllowMute"] boolValue];
        config.shouldConfirmSkip = [jsonObject[@"shouldSkipConfirm"] boolValue];
        config.skipConfirmYesLabel = jsonObject[@"skipConfirmYesLabel"];
        config.skipConfirmNoLabel = jsonObject[@"skipConfirmNoLabel"];
        config.skipTimerMessage = jsonObject[@"skipTimerMessage"];
        config.incentiveMessage = jsonObject[@"incentiveMessage"];
        config.shouldCollectFeedback = [jsonObject[@"shouldCollectFeedback"] boolValue];
        
        return config;
    }
    
    PokktUserInfo* getUserDetailsFromJSONString(NSString* stringData)
    {
        NSDictionary *jsonObject = extractJSON(stringData);
        
        PokktUserInfo *info = [[PokktUserInfo alloc] init];
        
        info.name = jsonObject[@"name"];
        info.age = jsonObject[@"age"];
        info.sex = jsonObject[@"sex"];
        info.mobileNumber = jsonObject[@"mobileNo"];
        info.emailAddress = jsonObject[@"emailAddress"];
        info.location = jsonObject[@"location"];
        info.birthday = jsonObject[@"birthday"];
        info.maritalStatus = jsonObject[@"maritalStatus"];
        info.facebookId = jsonObject[@"facebookId"];
        info.twitterHandle = jsonObject[@"twitterHandle"];
        info.educationInformation = jsonObject[@"education"];
        info.nationality = jsonObject[@"nationality"];
        info.employmentStatus = jsonObject[@"employment"];
        info.maturityRating = jsonObject[@"maturityRating"];
        
        return info;
    }
    
    PokktAnalyticsDetails* getAnalyticsDetailsFromJSONString(NSString* stringData)
    {
        NSDictionary *jsonObject = extractJSON(stringData);
        
        PokktAnalyticsDetails *details = [[PokktAnalyticsDetails alloc] init];
        
        // analytics
        details.googleTrackerID = jsonObject[@"googleAnalyticsID"];
        details.mixPanelTrackerID = jsonObject[@"mixPanelProjectToken"];
        details.flurryTrackerID = jsonObject[@"flurryApplicationKey"];
        
        if(jsonObject[@"selectedAnalyticsType"] != nil && ![jsonObject[@"selectedAnalyticsType"] isEqual:@""])
        {
            if ([jsonObject[@"selectedAnalyticsType"] isEqual:@"FLURRY"])
                details.eventType = FLURRY_ANALYTICS;
            
            else if ([jsonObject[@"selectedAnalyticsType"] isEqual:@"GOOGLE_ANALYTICS"])
                details.eventType = GOOGLE_ANALYTICS;
            
            else if ([jsonObject[@"selectedAnalyticsType"] isEqual:@"MIXPANNEL"])
                details.eventType = MIXPANNEL_ANALYTICS;
        }
        
        return details;
    }
    
    NSString* stringifyJSONDictionary(NSDictionary *jsonObject)
    {
        NSError *jsonError;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonObject options:0 error:&jsonError];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        return jsonString;
    }
    
    NSString* getReturnParamsFromValues(NSString* _Nonnull screenName,
                                        bool isRewarded,
                                        NSMutableDictionary<NSString *, id> *paramList)
    {
        if (!paramList)
        {
            paramList = [[NSMutableDictionary alloc] init];
        }
        
        paramList[@"SCREEN_NAME"] = screenName;
        paramList[@"IS_REWARDED"] = [NSNumber numberWithBool:(isRewarded ? true : false)];
        
        NSString *params = stringifyJSONDictionary(paramList);
        return params;
    }
    
    
    
    
    
#ifdef __cplusplus
}
#endif


// --------------------------- CORDOVA ------------------------------



@interface PokktNativeExtension : CDVPlugin {}

- (void) pluginInitialize;
- (void) executeSuccessCallback: (CDVInvokedUrlCommand*)command;
- (void) executeErrorCallback: (CDVInvokedUrlCommand*)command;

- (void)setPokktConfig: (CDVInvokedUrlCommand *)command;
- (void)setThirdPartyUserId: (CDVInvokedUrlCommand *)command;
- (void)setAdPlayerViewConfig: (CDVInvokedUrlCommand *)command;
- (void)setUserDetails: (CDVInvokedUrlCommand *)command;

- (void)VideoAd_cacheRewarded: (CDVInvokedUrlCommand *)command;
- (void)VideoAd_cacheNonRewarded: (CDVInvokedUrlCommand *)command;
- (void)VideoAd_showRewarded: (CDVInvokedUrlCommand *)command;
- (void)VideoAd_showNonRewarded: (CDVInvokedUrlCommand *)command;
- (void)VideoAd_checkAdAvailability_rewarded: (CDVInvokedUrlCommand *)command;
- (void)VideoAd_checkAdAvailability_nonRewarded: (CDVInvokedUrlCommand *)command;

- (void)Interstitial_cacheRewarded: (CDVInvokedUrlCommand *)command;
- (void)Interstitial_cacheNonRewarded: (CDVInvokedUrlCommand *)command;
- (void)Interstitial_showRewarded: (CDVInvokedUrlCommand *)command;
- (void)Interstitial_showNonRewarded: (CDVInvokedUrlCommand *)command;
- (void)Interstitial_checkAdAvailability_rewarded: (CDVInvokedUrlCommand *)command;
- (void)Interstitial_checkAdAvailability_nonRewarded: (CDVInvokedUrlCommand *)command;


- (void)Banner_loadBanner: (CDVInvokedUrlCommand *)command;
- (void)Banner_loadBannerWithRect: (CDVInvokedUrlCommand *)command;
- (void)Banner_destroyBanner: (CDVInvokedUrlCommand *)command;
- (void)Banner_shouldAutoRefresh: (CDVInvokedUrlCommand *)command;

- (void)InGameAd_fetchAssets: (CDVInvokedUrlCommand *)command;

- (void)Analytics_setAnalyticsDetails: (CDVInvokedUrlCommand *)command;
- (void)Analytics_trackIAP: (CDVInvokedUrlCommand *)command;
- (void)Analytics_notifyAppInstall: (CDVInvokedUrlCommand *)command;
- (void)Analytics_updateIGAData: (CDVInvokedUrlCommand *)command;

- (void)Debugging_shouldDebug: (CDVInvokedUrlCommand *)command;
- (void)Debugging_exportLog: (CDVInvokedUrlCommand *)command;
- (void)Debugging_showToast: (CDVInvokedUrlCommand *)command;
- (void)Debugging_showLog: (CDVInvokedUrlCommand *)command;

@end


@implementation PokktNativeExtension : CDVPlugin

- (void) pluginInitialize
{
    NSLog(@"pokkt plugin initialized!");
    
    [super pluginInitialize];
    
    // set cordova plugin
    cordovaPlugin = self;
}

- (void) executeSuccessCallback:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) executeErrorCallback:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


/**
 * Pokkt Standard APIs
 **/


- (void)setPokktConfig: (CDVInvokedUrlCommand *)command
{
    NSDictionary* paramNSStr = [command.arguments objectAtIndex:0];
    
    //NSDictionary *jsonObject = extractJSON(paramNSStr);
    NSString *appId = paramNSStr[@"appId"];
    NSString *securityKey = paramNSStr[@"securityKey"];
    
    PokktAdDelegate *adaptor = [[PokktAdDelegate alloc] init];
    
    [PokktVideoAds setPokktVideoAdsDelegate:adaptor];
    [PokktInterstial setPokktInterstitialDelegate:adaptor];
    
    [PokktAds setPokktConfigWithAppId:appId securityKey:securityKey];
    
    [self executeSuccessCallback:command];
}

- (void)setThirdPartyUserId: (CDVInvokedUrlCommand *)command
{
    NSString* paramNSStr = [command.arguments objectAtIndex:0];
    [PokktAds setThirdPartyUserId: paramNSStr];
    
    [self executeSuccessCallback:command];
}

- (void)setAdPlayerViewConfig: (CDVInvokedUrlCommand *)command;
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktAds setPokktAdPlayerViewConfig:getAdPlayerViewConfigFromJSONString(params)];
    
    [self executeSuccessCallback:command];
}

- (void)setUserDetails: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktAds setUserDetails:getUserDetailsFromJSONString(params)];
    
    [self executeSuccessCallback:command];
}

- (void)VideoAd_cacheRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktVideoAds cacheRewarded:params];
    
    [self executeSuccessCallback:command];
}

- (void)VideoAd_cacheNonRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktVideoAds cacheNonRewarded:params];
    
    [self executeSuccessCallback:command];
}

- (void)VideoAd_showRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktVideoAds showRewarded:params withViewController:getRootViewController()];
    
    [self executeSuccessCallback:command];
}

- (void)VideoAd_showNonRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktVideoAds showRewarded:params withViewController:getRootViewController()];
    
    [self executeSuccessCallback:command];
}

- (void)VideoAd_checkAdAvailability_rewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktVideoAds checkRewardedAdAvailability:params];
    
    [self executeSuccessCallback:command];
}

- (void)VideoAd_checkAdAvailability_nonRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktVideoAds checkNonRewardedAdAvailability:params];
    
    [self executeSuccessCallback:command];
}

- (void)Interstitial_cacheRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktInterstial cacheRewarded:params];
    
    [self executeSuccessCallback:command];
}

- (void)Interstitial_cacheNonRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktInterstial cacheNonRewarded:params];
    
    [self executeSuccessCallback:command];
}

- (void)Interstitial_showRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktInterstial showRewarded:params withViewController:getRootViewController()];
    
    [self executeSuccessCallback:command];
}

- (void)Interstitial_showNonRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktInterstial showNonRewarded:params withViewController:getRootViewController()];
    
    [self executeSuccessCallback:command];
}

- (void)Interstitial_checkAdAvailability_rewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktInterstial checkRewardedAdAvailability:params];
    
    [self executeSuccessCallback:command];
}

- (void)Interstitial_checkAdAvailability_nonRewarded: (CDVInvokedUrlCommand *)command
{
    NSString* params = [command.arguments objectAtIndex:0];
    [PokktInterstial checkNonRewardedAdAvailability:params];
    
    [self executeSuccessCallback:command];
}

- (void)Banner_loadBanner: (CDVInvokedUrlCommand *)command
{
    NSLog(@"Invalid operation");
    [self executeErrorCallback:command];
}

- (void)Banner_loadBannerWithRect: (CDVInvokedUrlCommand *)command
{
    NSLog(@"Invalid operation");
    [self executeErrorCallback:command];
}

- (void)Banner_destroyBanner: (CDVInvokedUrlCommand *)command
{
    NSLog(@"Invalid operation");
    [self executeErrorCallback:command];
}

- (void)Banner_shouldAutoRefresh: (CDVInvokedUrlCommand *)command
{
    NSLog(@"Invalid operation");
    [self executeErrorCallback:command];
}

- (void)InGameAd_fetchAssets: (CDVInvokedUrlCommand *)command
{
    NSLog(@"Invalid operation");
    [self executeErrorCallback:command];
}

- (void)Analytics_setAnalyticsDetails: (CDVInvokedUrlCommand *)command
{
    NSString* paramNSStr = [command.arguments objectAtIndex:0];
    
    [PokktAds setPokktAnalyticsDetail:getAnalyticsDetailsFromJSONString(paramNSStr)];
}

- (void)Analytics_trackIAP: (CDVInvokedUrlCommand *)command
{
    NSString* paramNSStr = [command.arguments objectAtIndex:0];
    [PokktAds trackIAP:parseIAPDetails(paramNSStr)];
    
    [self executeSuccessCallback:command];
}

- (void)Analytics_notifyAppInstall: (CDVInvokedUrlCommand *)command
{
    [PokktAds notifyAppInstall];
    
    [self executeSuccessCallback:command];
}

- (void)Analytics_updateIGAData: (CDVInvokedUrlCommand *)command
{
    NSLog(@"Invalid operation");
    [self executeErrorCallback:command];
}

- (void)Debugging_shouldDebug: (CDVInvokedUrlCommand *)command
{
    try
    {
        if (command.arguments.count > 0)
        {
            NSString *value = [command.arguments objectAtIndex:0];
            bool isDebug = [value boolValue];
            [PokktDebugger setDebug:isDebug];
            
            [self executeSuccessCallback:command];
        }
    }
    catch (NSException *e)
    {
        NSLog(@"invalid param received! : %@", e.reason);
    }
    
}

- (void)Debugging_exportLog: (CDVInvokedUrlCommand *)command
{
    [PokktDebugger exportLog:getRootViewController()];
}

- (void)Debugging_showToast: (CDVInvokedUrlCommand *)command
{
    NSString* paramNSStr = [command.arguments objectAtIndex:0];
    [PokktDebugger showToast:paramNSStr viewController:getRootViewController()];
    
    [self executeSuccessCallback:command];
}

- (void)Debugging_showLog: (CDVInvokedUrlCommand *)command
{
    NSString* paramNSStr = [command.arguments objectAtIndex:0];
    [PokktDebugger printLog:paramNSStr];
    
    [self executeSuccessCallback:command];
}

- (void) getSDKVersion: (CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    NSString* result = [PokktAds getSDKVersion];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end


#pragma mark - PokktAdDelegate class Implementatioon


@implementation PokktAdDelegate

// use this to notify the framework observer
- (void) notifyFramework:(NSString*) operation param:(NSString*) param
{
    if (cordovaPlugin != nil)
    {
        NSString *event = [NSString stringWithFormat:@"javascript:cordova.fireDocumentEvent('%@', { 'param': '%@' });", operation, param];
        [[cordovaPlugin webView] stringByEvaluatingJavaScriptFromString:event];
    }
    else
    {
        NSLog(@"plugin not found!");
    }
}

/***
 * Video Ad Delegate
 ***/

- (void) videoAdCachingCompleted:(NSString *) screenName isRewarded: (BOOL)isRewarded reward: (float)reward
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"REWARD"] = [[NSNumber numberWithFloat:reward] stringValue];
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_VIDEO_AD_CACHING_COMPLETED param:params];
}

- (void) videoAdCachingFailed: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"ERROR_MESSAGE"] = errorMessage;
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_VIDEO_AD_CACHING_FAILED param:params];
}

- (void) videoAdCompleted: (NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_VIDEO_AD_COMPLETED param:params];
}

- (void) videoAdDisplayed: (NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_VIDEO_AD_DISPLAYED param:params];
}

- (void) videoAdGratified: (NSString *)screenName reward:(float)reward
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"REWARD"] = [[NSNumber numberWithFloat:reward] stringValue];
    NSString *params = getReturnParamsFromValues(screenName, true, additionalParams);
    
    [self notifyFramework:EVENT_VIDEO_AD_GRATIFIED param:params];
}

- (void) videoAdSkipped: (NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_VIDEO_AD_SKIPPED param:params];
}

- (void) videoAdClosed:(NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_VIDEO_AD_CLOSED param:params];
    
}

- (void) videoAdAvailabilityStatus: (NSString *)screenName isRewarded: (BOOL)isRewarded isAdAvailable: (BOOL)isAdAvailable
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"IS_AVAILABLE"] = isAdAvailable ? @"true" : @"false";
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_VIDEO_AD_AVAILABILITY param:params];
}

- (void) videoAdFailedToShow: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"ERROR_MESSAGE"] = errorMessage;
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_VIDEO_AD_FAILED_TO_SHOW param:params];
}


/***
 * Interstitial Delegate
 ***/

- (void) interstitialCachingCompleted:(NSString *) screenName isRewarded: (BOOL)isRewarded reward: (float)reward
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"REWARD"] = [[NSNumber numberWithFloat:reward] stringValue];
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_INTERSTITIAL_CACHING_COMPLETED param:params];
}

- (void) interstitialCachingFailed: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"ERROR_MESSAGE"] = errorMessage;
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_INTERSTITIAL_CACHING_FAILED param:params];
}

- (void) interstitialCompleted: (NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_INTERSTITIAL_COMPLETED param:params];
}

- (void) interstitialDisplayed: (NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_INTERSTITIAL_DISPLAYED param:params];
}

- (void) interstitialGratified: (NSString *)screenName reward:(float)reward
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"REWARD"] = [[NSNumber numberWithFloat:reward] stringValue];
    NSString *params = getReturnParamsFromValues(screenName, true, additionalParams);
    
    [self notifyFramework:EVENT_INTERSTITIAL_GRATIFIED param:params];
}

- (void) interstitialSkipped: (NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_INTERSTITIAL_SKIPPED param:params];
}

- (void) interstitialClosed:(NSString *)screenName isRewarded: (BOOL)isRewarded
{
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, nil);
    
    [self notifyFramework:EVENT_INTERSTITIAL_CLOSED param:params];
}

- (void) interstitialAvailabilityStatus: (NSString *)screenName isRewarded: (BOOL)isRewarded isAdAvailable: (BOOL)isAdAvailable
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"IS_AVAILABLE"] = isAdAvailable ? @"true" : @"false";
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_INTERSTITIAL_AVAILABILITY param:params];
}

- (void) interstitialFailedToShow: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage
{
    NSMutableDictionary *additionalParams = [[NSMutableDictionary alloc] init];
    additionalParams[@"ERROR_MESSAGE"] = errorMessage;
    NSString *params = getReturnParamsFromValues(screenName, isRewarded, additionalParams);
    
    [self notifyFramework:EVENT_INTERSTITIAL_FAILED_TO_SHOW param:params];
}

@end
