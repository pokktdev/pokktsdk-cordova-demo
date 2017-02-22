#POKKT SDK Cordova Integration Guide (v6.0)
##OverviewThank you for choosing Pokkt SDK for Cordova . This document contains all the information required to set up the SDK with your project. We also support mediation for various third party networks. To know the supported third party networks and their integration process go toplugins section .
Before implementing plugins it is mandatory to go through project configuration and implementation steps , as these sections contain mandatory steps for basic SDK integration and are followed by every plugin.
**ScreenName**: This one parameter is accepted by almost all API’s of Pokkt SDK. This controls the placement of ads and can be created on Pokkt Dashboard.
There is a SampleApp demo app provided . We will be referencing this app during the course of explanation in this document. We suggest you go through the sample app for better understanding.
##Project Configuration### DependenciesExtract the provided file “ PokktCordovaPlugin.zip ” into a directory. Execute the following command from your terminal:
`$phonegap plugin add / < path-to-plugin-directory>/cordova-plugin-pokkt/`
###Required FrameworksOnce your project is built and the XCode project is exported, open this exported project using XCode. Ensure the followings frameworks are present(linked) inside project setting’s“ Build-Phases -> Link Binaries With Libraries ”, if not than add them manually:

~~~CoreData .frameworkFoundation .frameworkMediaPlayer .frameworkSystemConfiguration .frameworkUIKit .frameworkCoreTelephony .frameworkEventKit .frameworkAdSupport .frameworkCoreGraphics .frameworkAVFoundation .framework
~~~
##Implementation Steps###SDK Configuration1. For all invocation of Pokkt SDK developer will make use of methods available in pokktAds.js file using PokktExtension object.2. Set Application Id and Security key in Pokkt SDK. You can get it from Pokkt dashboard from your account. We generally assign unique application Id and Security key.

	~~~pe = window.plugin.pokktExtension;pe.setPokktConfig(“<Pokkt Application ID>”, “<Pokkt Security Key>”);
	~~~3. If you are using server to server integration with Pokkt, you can also set Third Party UserId in pokktAds.
	`pe.setThirdPartyUserId(“<Third party user Id>”);`
	4. When your application is under development and if you want to see Pokkt logs and other informatory messages, you can enable it by setting ShouldDebug to true . Make sure to disable debugging before release.	`pe.setDebug(<true>);`
###Ad Types####VideoVideo ad can be rewarded or non-rewarded. You can either cache the ad in advance or directly call show for it. We suggest you to cache the ad in advance so as to give seamless play behaviour, In other case it will stream the video which may lead to unnecessary buffering delays depending on the network connection.
#####Rewarded1. To cache rewarded ad call:<br>`pe.cacheRewardedVideoAd(“<ScreenName>”);`2. To show rewarded ad call:<br>`pe.showRewardedVideoAd(“<ScreenName>”);`3. You can check if ad is available or not before making cache or show request for rewarded`pe.checkRewardedVideoAdAvailability(“<screen name>”, <true / false>);`<br>
#####Non Rewarded1. To cache non-rewarded ad call:<br>`pe.cacheNonRewardedVideoAd(“<ScreeName>”);`2. To show non-rewarded ad call:<br>`pe.showNonRewardedVideoAd(“<ScreeName>”);`3. You can check if ad is available or not before making c ache or show request for non rewarded.`pe.checkNonRewardedVideoAdAvailability(“<screen name>”, <true / false>);`
####Interstitial#####Rewarded1. To cache rewarded ad call:<br>`pe.cacheRewardedInterstitial(“<ScreenName>”);`2. To show rewarded ad call:<br>
	`pe.ShowRewardedInterstitial(“<ScreenName>”);`
3. You can check if ad is available or not before making c ache or show request for rewarded`pe.checkRewardedInterstitialAvailability(“<ScreenName>”);`<br>
#####Non Rewarded1. To cache non-rewarded ad call:<br>`pe.cacheNonRewardedInterstitial(“<ScreeName>”);`2. To show non-rewarded ad call:<br>`pe.showNonRewardedInterstitial(“<ScreenName>”);`3. You can check if ad is available or not before making c ache or show request for non rewarded	`pe.checkNonRewardedInterstitialAvailability(“<ScreenName>”);`
###Ad ActionsAd actions are optional, but we suggest to implement them as it will help you to keep track of the status of your ad request.

~~~document.addEventListener('AdAvailability', this.handleAdAvailability, false);document.addEventListener('AdCachingCompleted', this.handleAdCachingCompleted, false);document.addEventListener('AdCachingFailed', this.handleAdCachingFailed, false);document.addEventListener('AdDisplayed', this.handleAdDisplayed, false);document.addEventListener('AdSkipped', this.handleAdSkipped, false);document.addEventListener('AdCompleted', this.handleAdCompleted, false);document.addEventListener('AdClosed', this.handleAdClosed, false);document.addEventListener('AdGratified', this.handleAdGratified, false);document.addEventListener('AdFailedToShow', this.handleAdShowFailed, false);
~~~###Pokkt ad player configurationPokkt Ad player works the way App is configured at Pokkt dashboard, but we provide a way to override those settings using PokktAdPlayerViewConfig .
Application should prefer configuration provided through code by developer or what’s configured for the app in dashboard, can be controlled any time through the dashboard itself. If you want tomake changes to this configuration after your app distribution, you can contact Pokkt Team to do the same for your app through admin console.
Various properties that can be managed through this are:
1. **Back button**
	Defines if user is allowed to close the Advertisement by clicking on back button or not.
	
	~~~Property name : BackButtonDisabledValues:True = Back button is disabled and user cannot close the Ad.False = Back button is not disabled and user can close the Ad.
~~~2. **Default skip time**	Defines the time after which user can skip the Ad.
	
	~~~Property name: DefaultSkipTimeValues:Any Integer value.Default value is 10 seconds .
	~~~3. **Should allow skip**
	Defines if user is allowed to skip the Ad or not.
	
	~~~Property name: ShouldAllowSkipValues:True = User can skip Ad.False = User can’t skip Ad.
	~~~4. **Should allow mute**
	Defines if user is allowed to mute the Video Ad or not.
	
	~~~Property name: ShouldAllowMuteValues:True = User can mute video Ad.False = User can’t mute video Ad.
	~~~5. **Should confirm skip**
	Defines if confirmation dialog is to be shown before skipping the Ad.
	
	~~~Property name: ShouldConfirmSkipValues:True = Confirmation dialog will be shown before skipping the video.False = Confirmation dialog will not be shown before skipping the video.
	~~~6. **Skip confirmation message**
	Defines what confirmation message to be shown in skip dialog.
	
	~~~Property name: SkipConfirmMessageValues:Any String message.Default value is “Skipping this video will earn you NO rewards. Are you sure?”.
	~~~7. **Affirmative label for skip dialog**	Defines what should be the label for affirmative button in skip dialog.
	
	~~~Property name: SkipConfirmYesLabelValues:Any String message.Default value is “Yes”.
	~~~
8. **Negative label for skip dialog**	Defines what should be the label for affirmative button in skip dialog.
	
	~~~Property name: SkipConfirmNoLabelValues:Any String message.Default value is “No”.
	~~~9. **Skip timer message**
	Defines message to be shown before enabling skip button. Don’t forget to add placeholder “ ## ” in your custom message.This placeholder is replaced by property “Default skip time” assigned above.
	
	~~~Property name: SkipTimerMessageValues:Any String message.Default value is “You can skip video in ## seconds”
	~~~10. **Incentive message**	Defines message to be shown during video progress, that after what time user will be incentivised.
	
	~~~Property name: IncentiveMessageValues:Any String messageDefault value is “more seconds only for your reward !”
~~~
###User DetailsFor better targeting of ads you can also provide user details to our SDK using.

~~~var pokktUserDetails = pe.createPokktUserDetails();pokktUserDetails.Name = "";pokktUserDetails.Age = "";pokktUserDetails.Sex = "";pokktUserDetails.MobileNo = "";pokktUserDetails.EmailAddress = "";pokktUserDetails.Location = "";pokktUserDetails.Birthday = "";pokktUserDetails.MaritalStatus = "";pokktUserDetails.FacebookId = "";pokktUserDetails.TwitterHandle = "";pokktUserDetails.Education = "";pokktUserDetails.Nationality = "";pokktUserDetails.Employment = "";pokktUserDetails.MaturityRating = "";pe.setUserDetails(pokktUserDetails);
~~~
###DebuggingOther than enabling debugging for Pokkt SDK, it can also be used to:
1. **Export log**
	Export your log to your desired location, we generally have it in root directory of SD card, if permission for external storage is provided and in cache folder otherwise.
	`pe.ExportLog();`
2. **Export log to cloud**
	You can also export log to cloud.<br>
	`pe.ExportLogToCloud();`
###AnalyticsWe support various analytics in Pokkt SDK. Below is mentioned how to enable various analytics with Pokkt SDK.
####Google Analytics

~~~var analyticsDetail = pe.createAnalyticsDetails();analyticsDetail.selectedAnalyticsType = “GOOGLE_ANALYTICS”;analyticsDetail.googleAnalyticsID = "Google Analytics Id";pe.setAnalyticsDetails(analyticsDetail);
~~~
####Flurry AnalyticsFlurry application key can be obtained from Flurry dashboard.

~~~var analyticsDetail = pe.createAnalyticsDetails();analyticsDetail.selectedAnalyticsType = “FLURRY”;analyticsDetail.flurryApplicationKey = "flurry Application Key";pe.setAnalyticsDetails(analyticsDetail);
~~~####MixPanel AnalyticsMixPanel project token can be obtained from MixPanel dashboard.

~~~var analyticsDetail = pe.createAnalyticsDetails();analyticsDetail.selectedAnalyticsType = “MIXPANEL”;analyticsDetail.mixPanelProjectToken = "mixPanel Project Token";pe.setAnalyticsDetails(analyticsDetail);
~~~