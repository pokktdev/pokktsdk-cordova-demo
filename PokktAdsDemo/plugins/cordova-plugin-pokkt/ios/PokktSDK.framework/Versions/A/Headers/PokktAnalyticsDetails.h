//
//  PokktAnalyticsDetails.h
//  PokktSDK
//
//  Created by Subhendu Sekhar Sahu on 11/01/17.
//  Copyright © 2017 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum : int {
    NONE,
    FLURRY_ANALYTICS,
    GOOGLE_ANALYTICS,
    MIXPANNEL_ANALYTICS,
    FABRIC_ANALYTICS
} AnalyticsType;

@interface PokktAnalyticsDetails : NSObject

/*!
 @abstract
 Once you create application in google developer console, you will get analytics id.
 
 **/

@property (nonatomic, retain) NSString *googleTrackerID;

/*!
 @abstract
 Once you create application in Flurry dashboard, flurry application Id will get generated.
 
 **/

@property (nonatomic, retain) NSString *flurryTrackerID;

/*!
 @abstract
 Once you create application in mixpanel dashboard, project token will get generated.
 
 **/
@property (nonatomic, retain) NSString *mixPanelTrackerID;

/*!
 @abstract
 For sending any measurement the Analytics class needs to be configured. To do
 this we need to following steps:
 
 self.pokktConfig.eventType = FABRIC_ANALYTICS;
 
 self.pokktConfig.eventType = MIXPANNEL_ANALYTICS;
 
 self.pokktConfig.eventType = GOOGLE_ANALYTICS;
 
 self.pokktConfig.eventType = FLURRY_ANALYTICS;
 
 By Defaults, self.pokktConfig.eventType = NONE;
 
 **/

@property (nonatomic, assign) AnalyticsType eventType;


@end
