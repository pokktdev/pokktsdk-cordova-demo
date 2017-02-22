//
//  PokktNetworkModel.h
//  ObjectiveCTask
//
//  Created by Subhendu Sekhar Sahu on 01/07/16.
//  Copyright © 2016 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PokktNetworkModel : NSObject

@property (nonatomic, retain) NSString * name;

@property (nonatomic, retain) NSString * className;

@property (nonatomic, retain) NSDictionary  * customData;

@property (nonatomic, retain) NSString  * networkID;

@property (nonatomic, retain) NSString  * intgrationType;

@property (nonatomic, retain) NSString * allotedCacheTime;

@property (nonatomic, assign) int adFormat;

@property (nonatomic, assign) int responseFormat;

@property (nonatomic, retain) NSString * requestUrl;

@property (nonatomic) BOOL isSupportRewarded;

@property (nonatomic) BOOL isSupportNonRewarded;

@property (nonatomic, assign) int type;

@property (nonatomic, retain) NSString *comscorePartnerID;


- (void)initNetwork:(NSDictionary *)dictionary;

//- (void)setNetworkName:(NSDictionary*)dictionary;
//
//- (void)setNetworkClassName:(NSDictionary*)dictionary;
//
//- (void)setNetworkCustomData:(NSDictionary *)dictionary;
//
//- (void)setNetworkId:(NSDictionary *)dictionary;
//
//- (void)setNetworkIntgrationType:(NSDictionary *)dictionary;

@end
