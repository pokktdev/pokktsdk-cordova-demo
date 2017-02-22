//
//  PokktAdConfig.h
//  ObjectiveCTask
//
//  Created by Subhendu Sekhar Sahu on 01/07/16.
//  Copyright © 2016 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum : int
{
    VIDEO = 0,
    BANNER = 1,
    INTERSTITIAL = 3,
    INGAME_BRANDING = 4
} AdFormatType;

/**
 * This is ad request configuration. Developer should supply this in almost every ad related method.
 */

@interface PokktAdConfig : NSObject <NSCopying>

/*! @abstract screenName Screen name for which ad is requested. */

@property (nonatomic, retain) NSString *screenName;

/*! @abstract isRewarded rewarded or non rewarded ad request */

@property (nonatomic, assign) BOOL isRewarded;

/*! @abstract adFormat is a type for ad such as  0:video, 1: banner, 3: interstitial , default is 0 */

@property (nonatomic, assign) int adFormat;

- (NSString *) getKey;

@end
