//
//  PokktNetworkDelegate.h
//  ObjectiveCTask
//
//  Created by Subhendu Sekhar Sahu on 04/07/16.
//  Copyright © 2016 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PokktNetworkModel.h"
#import "PokktAdConfig.h"

@interface PokktNetworkDelegate : NSObject

+ (void)didFinishedAdDownload: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig rewardValue: (float)reward
                  downLoadTime: (NSString *)downloadTime;

+ (void)didFailedAdDownload:(PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig errorMessage:(NSString *)errorMsg;

+ (void)onAdCompleted: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig;

+ (void)onAdDisplayed: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig;

+ (void)onAdGratified: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig rewardPoint: (float)reward;

+ (void)onAdSkipped: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig;

+ (void)onAdClosed: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig;

+ (void)didFailedToShowAd: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig;

+ (void)onAdAvailabilityStatus: (PokktNetworkModel *)networkModel adConfig: (PokktAdConfig *)adConfig isAdAvailable:(BOOL)isAdAvailable;
@end
