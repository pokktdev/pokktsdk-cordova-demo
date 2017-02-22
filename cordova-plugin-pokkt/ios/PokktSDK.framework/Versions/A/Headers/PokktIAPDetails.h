//
//  InAppPurchaseDetails.h
//  ObjectiveCTask
//
//  Created by Subhendu Sekhar Sahu on 01/07/16.
//  Copyright © 2016 Pokkt. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PokktIAPDetails : NSObject
{
    
}

@property (nonatomic, retain) NSString * productCurrency;
@property (nonatomic, retain) NSString * productDescription;
@property (nonatomic, retain) NSString * productIdentifier;
@property (nonatomic, retain) NSString * productPrice;
@property (nonatomic, retain) NSString * productTitle;

@end
