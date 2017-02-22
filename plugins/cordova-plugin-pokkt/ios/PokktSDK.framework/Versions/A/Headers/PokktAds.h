#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "PokktAdsDelegates.h"
#import "PokktBannerView.h"
#import "PokktUserInfo.h"
#import "PokktAdPlayerViewConfig.h"
#import "PokktAnalyticsDetails.h"
#import "PokktIAPDetails.h"


@interface PokktVideoAds : NSObject

/*!
 @abstract
 Set the PokktVideoAds Delegate
 
 @param videoDelegate video Delegate
 
 @discussion Call this before cache and show video ads. SDK uses this delegate to communicate to your app and notifies the status of ads, such as an ad has been cached or failed, ad watched
 completely or skipped and ad availability status.
 
 */

+ (void)setPokktVideoAdsDelegate: (id <PokktVideoAdsDelegate>)videoDelegate;

/*!
 @abstract
 This method will be used to cache rewarded video ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) cacheRewarded:(NSString*) screenName;

/*!
 @abstract
 This method will be used to show rewarded video ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 
 @param viewController The UIViewController in which you will display the ad. Must not be `nil`. This is required so that the ad can present additional view controllers if the user interacts with it.
 */

+(void) showRewarded:(NSString*) screenName withViewController:(UIViewController *) viewController;

/*!
 @abstract
 This method can be used by developer to check if there is any rewarded ad cached for a particular screenName and is available to show.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) checkRewardedAdAvailability:(NSString *)screenName;

/*!
 @abstract
 This method will be used to cache non rewarded video ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) cacheNonRewarded:(NSString*) screenName;

/*!
 @abstract
 This method will be used to show non rewarded video ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 
 @param viewController The UIViewController in which you will display the ad. Must not be `nil`. This is required so that the ad can present additional view controllers if the user interacts with it.
 */

+(void) showNonRewarded:(NSString*) screenName withViewController:(UIViewController *) viewController;

/*!
 @abstract
 This method can be used by developer to check if there is any non rewarded ad cached for a particular screenName and is available to show.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) checkNonRewardedAdAvailability:(NSString *)screenName;

@end


@interface PokktInterstial : NSObject

/*!
 @abstract
 Set the PokktInterstitialAds Delegate
 
 @param interstitialDelegate Interstitial Delegate
 
 @discussion Call this before cache and show Interstitial ads. SDK uses this delegate to communicate to your app and notifies the status of ads, such as an ad has been cached or failed, ad watched
 completely or skipped and ad availability status.
 
 */

+ (void)setPokktInterstitialDelegate: (id <PokktInterstitialDelegate>)interstitialDelegate;

/*!
 @abstract
 This method will be used to cache rewarded interstitial ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) cacheRewarded:(NSString*) screenName;

/*!
 @abstract
 This method will be used to show rewarded interstitial ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 
 @param viewController The UIViewController in which you will display the ad. Must not be `nil`. This is required so that the ad can present additional view controllers if the user interacts with it.
 */

+(void) showRewarded:(NSString*) screenName withViewController:(UIViewController *) viewController;

/*!
 @abstract
 This method can be used by developer to check if there is any rewarded interstitial ad cached for a particular screenName and is available to show.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) checkRewardedAdAvailability:(NSString *)screenName;

/*!
 @abstract
 This method will be used to cache non rewarded interstitial ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) cacheNonRewarded:(NSString*) screenName;

/*!
 @abstract
 This method will be used to show non rewarded interstitial ad of a particular screenname.
 
 @param screenName Screen name for which ad is requested.
 
 @param viewController The UIViewController in which you will display the ad. Must not be `nil`. This is required so that the ad can present additional view controllers if the user interacts with it.
 */

+(void) showNonRewarded:(NSString*) screenName withViewController:(UIViewController *) viewController;

/*!
 @abstract
 This method can be used by developer to check if there is any rewarded non interstitial ad cached for a particular screenName and is available to show.
 
 @param screenName Screen name for which ad is requested.
 */

+(void) checkNonRewardedAdAvailability:(NSString *)screenName;

@end

@interface PokktBanner : NSObject

/*!
 @abstract
 Set the PokktBannerAd Delegate
 
 @param bannerDelegate Banner Delegate
 
 @discussion Call this before load Banner ads. SDK uses this delegate to communicate to your app and notifies the status of ads, such as an ad has been cached or failed.
 */

+ (void)setPokktBannerDelegate: (id <PokktBannerDelegate>)bannerDelegate;

/*!
 @abstract
 initWithBannerAdSize will create a banner view and will display on screen.
 
 @param adSize size of banner.
 */

+ (PokktBannerView *)initWithBannerAdSize:(CGRect)adSize;

/*!
 @abstract
 Load banner will load the banner and will display on screen.
 
 @param bannerView is a view on that banner will display. It must be added on your viewController before loading banner.
 
 @param viewController The UIViewController in which you will display the banner. Must not be `nil`. This is required so that the ad can present additional view controllers if the user interacts with it.
 
 @param screenName  screenName Screen name for which ad is requested.
 
 */

+ (void)loadBanner:(PokktBannerView *)bannerView withScreenName:(NSString *)screenName rootViewContorller:(UIViewController *)viewController;

/*!
 @abstract
 Use setBannerAutoRefresh method to disable/enable auto refresh.
 
 @param isAutoRefresh Set false if you want to disable auto refresh.
 */

+ (void)setBannerAutoRefresh:(BOOL)isAutoRefresh;

/*!
 @abstract
 Use destroyBanner method use to remove your bannerContainer.
 
 @param bannerContainer your view which is used to show banner ad
 */

+ (void)destroyBanner:(PokktBannerView *)bannerContainer;

@end

@interface PokktInGameAd : NSObject

/*!
 @abstract
 Set the PokktIGADelegate Delegate
 
 @param igaDelegate IGA Delegate
 
 */

+ (void) setIGADelegate:(id<PokktIGADelegate>)igaDelegate;

+ (void) fetchIGAAssets:(NSString*)screenName;

@end

@interface PokktDebugger : NSObject

/*!
 @abstract
 Returns the debug enable status of the POKKT SDK.
 */

+ (BOOL)isDebugEnabled;

/*!
 @abstract
 This method enables/disables the debug logging done by SDK.
 
 by default, logging is off.
 
 @param isDebug true if debug on else false
 */

+ (void)setDebug:(BOOL)isDebug;

/*!
 @abstract
 This exposed method let developers export POKKT SDK log.
 
 @param viewController The UIViewController in which you will see all installed app on your device to export log file . Must not be `nil`.
 */

+ (void)exportLog:(UIViewController *)viewController;

/*!
 @abstract
 This is an utility method to show toast.
 
 @param viewController The UIViewController in which you will display the toast message. Must not be `nil`.
 @param message Message to show
 */

+ (void)showToast:(NSString *)message viewController:(UIViewController *)viewController;

/*!
 @abstract
 This is an method to print log.
 
 @param message Message to show
 */

+(void)printLog:(NSString *)message;

@end

@interface PokktAds : NSObject

/*!
 @abstract
 This method sends the developer app installation information to POKKT server.
 Developer has to call this method only once when his application installs on device.
 */

+ (void)notifyAppInstall;

/*!
 @abstract
 This method is used to set applicationID and security key
 
 @param appId Application Id which you will get from Pokkt dashboard when you create application their.
 
 @param securityKey Security Key which you will get from Pokkt dashboard when you create application their.
 */

+ (void) setPokktConfigWithAppId:(NSString*) appId securityKey:(NSString*) securityKey;

/*!
 @abstract
 This is unique id which will be given to user and generated by developer/publisher.
 Developer/publisher can used this Id to identify their user for the purposes like S2S integration to gratify user
 
 **/

+ (void) setThirdPartyUserId:(NSString*) userId;

// optional parameters
/*!
 @abstract
 This is optional, set user detail like name , age , sex etc.
 
 **/

+ (void)setUserDetails: (PokktUserInfo *)userInfo;

/*!
 @abstract
 Returns the version of the POKKT SDK.
 */

+ (NSString *)getSDKVersion;

/*!
 @abstract
 This function fetch all notification from Pokkt server. All fetched notification will fire on date which you set on POKKT Dashboard.
 
 */

+ (void)callBackgroundTaskCompletedHandler:(void (^)(UIBackgroundFetchResult result))completionHandler;

/*!
 @abstract
 This function will send recieved notification data to POKKT server.
 
 @param localNotification received notification in AppDelegate.m class. You need to pass    same.
 
 */

+ (void)inAppNotificationEvent:(UILocalNotification *)localNotification;

/*!
 @abstract
 This method is called by developer to register notification.
 
 @param aSelector Selector method to register notification.
 
 @param application {@link UIApplication}
 */

+ (void)setupNotification:(SEL)aSelector application:(UIApplication*)application;

// optional parameters
/*!
 @abstract
 This is optional, set player detail like skip time, skip message, shouldAllowSkip , skipConfirmMessage etc.
 
 **/

+ (void)setPokktAdPlayerViewConfig: (PokktAdPlayerViewConfig *)adPlayerViewConfig;

+ (void)setPokktAnalyticsDetail:(PokktAnalyticsDetails *)analyticsDetail;

+ (void)trackIAP:(PokktIAPDetails *)inAppPurchaseDetails;

+ (void) updateIGAData:(NSString*)igaAnalyticsData;

@end
