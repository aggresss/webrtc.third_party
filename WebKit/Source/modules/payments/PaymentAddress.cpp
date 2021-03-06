// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "modules/payments/PaymentAddress.h"

#include "bindings/core/v8/V8ObjectBuilder.h"
#include "platform/wtf/text/StringBuilder.h"

namespace blink {

PaymentAddress::PaymentAddress(
    payments::mojom::blink::PaymentAddressPtr address)
    : country_(address->country),
      address_line_(address->address_line),
      region_(address->region),
      city_(address->city),
      dependent_locality_(address->dependent_locality),
      postal_code_(address->postal_code),
      sorting_code_(address->sorting_code),
      language_code_(address->language_code),
      organization_(address->organization),
      recipient_(address->recipient),
      phone_(address->phone) {
  if (!language_code_.IsEmpty() && !address->script_code.IsEmpty()) {
    StringBuilder builder;
    builder.Append(language_code_);
    builder.Append('-');
    builder.Append(address->script_code);
    language_code_ = builder.ToString();
  }
}

PaymentAddress::~PaymentAddress() {}

ScriptValue PaymentAddress::toJSONForBinding(ScriptState* script_state) const {
  V8ObjectBuilder result(script_state);
  result.AddString("country", country());
  result.Add("addressLine", addressLine());
  result.AddString("region", region());
  result.AddString("city", city());
  result.AddString("dependentLocality", dependentLocality());
  result.AddString("postalCode", postalCode());
  result.AddString("sortingCode", sortingCode());
  result.AddString("languageCode", languageCode());
  result.AddString("organization", organization());
  result.AddString("recipient", recipient());
  result.AddString("phone", phone());
  return result.GetScriptValue();
}

}  // namespace blink
