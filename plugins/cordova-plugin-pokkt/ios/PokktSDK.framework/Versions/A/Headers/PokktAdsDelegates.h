//
//  PokktAdsDelegates.h
//  PokktSDK
//
//  Created by Subhendu Sekhar Sahu on 03/01/17.
//  Copyright © 2017 Pokkt. All rights reserved.
//

@protocol PokktVideoAdsDelegate <NSObject>

@optional

- (void)videoAdCachingCompleted: (NSString *)screenName isRewarded: (BOOL)isRewarded reward: (float)reward;

- (void)videoAdCachingFailed: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage;

- (void)videoAdCompleted: (NSString *)screenName isRewarded: (BOOL)isRewarded;

- (void)videoAdDisplayed: (NSString *)screenName isRewarded: (BOOL)isRewarded;

- (void)videoAdGratified: (NSString *)screenName reward:(float)reward;

- (void)videoAdSkipped: (NSString *)screenName isRewarded: (BOOL)isRewarded;

- (void)videoAdClosed:(NSString *)screenName isRewarded: (BOOL)isRewarded;

- (void)videoAdAvailabilityStatus: (NSString *)screenName isRewarded: (BOOL)isRewarded isAdAvailable: (BOOL)isAdAvailable;

- (void)videoAdFailedToShow: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage;

@end


@protocol PokktInterstitialDelegate <NSObject>

@optional

- (void)interstitialCachingCompleted: (NSString *)screenName isRewarded: (BOOL)isRewarded reward: (float)reward;

- (void)interstitialCachingFailed: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage;

- (void)interstitialCompleted: (NSString *)screenName isRewarded: (BOOL)isRewarded; //TODO: Requirement check

- (void)interstitialDisplayed: (NSString *)screenName isRewarded: (BOOL)isRewarded;

- (void)interstitialGratified: (NSString *)screenName reward:(float)reward;

- (void)interstitialSkipped: (NSString *)screenName isRewarded: (BOOL)isRewarded; //TODO: Requirement check

- (void)interstitialClosed:(NSString *)screenName isRewarded: (BOOL)isRewarded;

- (void)interstitialAvailabilityStatus: (NSString *)screenName isRewarded: (BOOL)isRewarded isAdAvailable: (BOOL)isAdAvailable;

- (void)interstitialFailedToShow: (NSString *)screenName isRewarded: (BOOL)isRewarded errorMessage: (NSString *)errorMessage;

@end


@protocol PokktBannerDelegate <NSObject>

@optional

- (void)bannerLoaded:(NSString *)screenName;

- (void)bannerLoadFailed:(NSString *)screenName errorMessage:(NSString *)errorMessage;

@end


@protocol PokktIGADelegate <NSObject>

@optional

- (void)onIGAAssetsReady: (NSString*)screenName igaAssets:(NSString*)igaAssets;

- (void)onIGAAssetsFailed: (NSString*)screenName errorMessage:(NSString *)errorMessage;

@end


