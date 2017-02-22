//
//  AdNetwork.h
//  ObjectiveCTask
//
//  Created by Subhendu Sekhar Sahu on 03/07/16.
//  Copyright © 2016 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PokktNetworkModel.h"
#import "PokktAdConfig.h"
#import <UIKit/UIKit.h>
#import "PokktAdsDelegates.h"

@protocol PokktAdNetwork <NSObject>

@required

- (BOOL) checkAdFormatSupport:(PokktAdConfig *)adConfig;

- (void) initNetworkWithNetworkModel: (PokktNetworkModel *)networkModel;

- (PokktNetworkModel *)getNetworkModel;

- (void) cacheAd: (PokktAdConfig *)adConfig;

- (void) showAd: (PokktAdConfig *)adConfig viewController:(UIViewController *)viewController;

- (void) checkAdAvailability: (PokktAdConfig *)adConfig;

- (void) setCacheTimedOut: (PokktAdConfig *)adConfig;

@optional

- (void) fetchAd:(PokktAdConfig *)adConfig
       withAdView:(UIView *)bannerView
withRootViewController:(UIViewController *)rootViewController
    withDelegate:(id<PokktBannerDelegate>)bannerDelegate
       onSuccess:(void(^)(id))successCallback
       onFailure:(void(^)(id))failureHandler;

@end
