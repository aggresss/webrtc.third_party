# Copyright 2014 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

{
  'conditions': [
    ['OS=="mac"', {
      'targets': [
        {
          'target_name': 'decklink',
          'type': 'static_library',
          'sources' : [
            'mac/include/DeckLinkAPIDispatch.cpp',
          ],
        },  # target decklink
      ]
     }],
  ]
}
