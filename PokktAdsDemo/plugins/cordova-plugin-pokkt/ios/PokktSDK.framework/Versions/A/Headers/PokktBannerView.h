//
//  PokktBannerView.h
//  PokktSDK
//
//  Created by Pokkt on 08/11/16.
//  Copyright © 2016 Pokkt. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PokktAdsDelegates.h"

@interface PokktBannerView : UIView <PokktBannerDelegate>

- (void)loadBanner:(NSString *)screenName rootViewController:(UIViewController *)rootViewController;
- (void)destroyBanner;

@end
