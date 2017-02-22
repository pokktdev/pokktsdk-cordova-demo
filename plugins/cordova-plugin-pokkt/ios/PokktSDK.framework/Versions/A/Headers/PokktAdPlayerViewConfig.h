//
//  PokktAdPlayerViewConfig.h
//  PokktSDK
//
//  Created by Subhendu Sekhar Sahu on 20/01/17.
//  Copyright © 2017 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PokktAdPlayerViewConfig : NSObject

/*! @abstract defaultSkipTime duration to skip ad, default is 0 */

@property (nonatomic, assign) int defaultSkipTime;

/*! @abstract shouldAllowSkip set YES or NO to skip ad, if 'YES' it will allow user to skip ad , default is YES */

@property (nonatomic, assign) BOOL shouldAllowSkip;

/*! @abstract shouldAllowMute set YES or NO to skip ad,if 'YES' it will allow user to Mute ad , default is YES */

@property (nonatomic, assign) BOOL shouldAllowMute;

/*! @abstract shouldConfirmSkip set YES or NO to skip ad, default is YES */

@property (nonatomic, assign) BOOL shouldConfirmSkip;

/*! @abstract skipConfirmMessage custom message for skip alert*/

@property (nonatomic, strong) NSString * skipConfirmMessage;

/*! @abstract skipConfirmYesLabel custom text for skip alert 'YES' Label*/

@property (nonatomic, strong) NSString * skipConfirmYesLabel;

/*! @abstract skipConfirmNoLabel custom text for skip alert 'NO' Label*/

@property (nonatomic, strong) NSString * skipConfirmNoLabel;

/*! @abstract skipTimerMessage custom message for remianing time to skip ad*/

@property (nonatomic, strong) NSString * skipTimerMessage;

/*! @abstract incentiveMessage custom message for remianing time to get reward*/

@property (nonatomic, strong) NSString * incentiveMessage;


@property (nonatomic, assign) BOOL shouldCollectFeedback;

@end
