/* -*- mode: JavaScript; indent-tabs-mode: nil; c-basic-offset: 4 -*- */
/* Copyright 2010-2013 Will Scullin <scullin@scullinsteel.com>
 *
 * Permission to use, copy, modify, distribute, and sell this software and its
 * documentation for any purpose is hereby granted without fee, provided that
 * the above copyright notice appear in all copies and that both that
 * copyright notice and this permission notice appear in supporting
 * documentation.  No representations are made about the suitability of this
 * software for any purpose.  It is provided "as is" without express or
 * implied warranty.
 */

/*exported Parallel */

function Parallel(io, cbs, slot) {
    slot = slot || 1;

    var LOC = {
        IOREG: 0x80
    };

    var _cbs = cbs;

    var rom = [
        0x18,0xb0,0x38,0x48,0x8a,0x48,0x98,0x48,
        0x08,0x78,0x20,0x58,0xff,0xba,0x68,0x68,
        0x68,0x68,0xa8,0xca,0x9a,0x68,0x28,0xaa,
        0x90,0x38,0xbd,0xb8,0x05,0x10,0x19,0x98,
        0x29,0x7f,0x49,0x30,0xc9,0x0a,0x90,0x3b,
        0xc9,0x78,0xb0,0x29,0x49,0x3d,0xf0,0x21,
        0x98,0x29,0x9f,0x9d,0x38,0x06,0x90,0x7e,
        0xbd,0xb8,0x06,0x30,0x14,0xa5,0x24,0xdd,
        0x38,0x07,0xb0,0x0d,0xc9,0x11,0xb0,0x09,
        0x09,0xf0,0x3d,0x38,0x07,0x65,0x24,0x85,
        0x24,0x4a,0x38,0xb0,0x6d,0x18,0x6a,0x3d,
        0xb8,0x06,0x90,0x02,0x49,0x81,0x9d,0xb8,
        0x06,0xd0,0x53,0xa0,0x0a,0x7d,0x38,0x05,
        0x88,0xd0,0xfa,0x9d,0xb8,0x04,0x9d,0x38,
        0x05,0x38,0xb0,0x43,0xc5,0x24,0x90,0x3a,
        0x68,0xa8,0x68,0xaa,0x68,0x4c,0xf0,0xfd,
        0x90,0xfe,0xb0,0xfe,0x99,0x80,0xc0,0x90,
        0x37,0x49,0x07,0xa8,0x49,0x0a,0x0a,0xd0,
        0x06,0xb8,0x85,0x24,0x9d,0x38,0x07,0xbd,
        0xb8,0x06,0x4a,0x70,0x02,0xb0,0x23,0x0a,
        0x0a,0xa9,0x27,0xb0,0xcf,0xbd,0x38,0x07,
        0xfd,0xb8,0x04,0xc9,0xf8,0x90,0x03,0x69,
        0x27,0xac,0xa9,0x00,0x85,0x24,0x18,0x7e,
        0xb8,0x05,0x68,0xa8,0x68,0xaa,0x68,0x60,
        0x90,0x27,0xb0,0x00,0x10,0x11,0xa9,0x89,
        0x9d,0x38,0x06,0x9d,0xb8,0x06,0xa9,0x28,
        0x9d,0xb8,0x04,0xa9,0x02,0x85,0x36,0x98,
        0x5d,0x38,0x06,0x0a,0xf0,0x90,0x5e,0xb8,
        0x05,0x98,0x48,0x8a,0x0a,0x0a,0x0a,0x0a,
        0xa8,0xbd,0x38,0x07,0xc5,0x24,0x68,0xb0,
        0x05,0x48,0x29,0x80,0x09,0x20,0x2c,0x58,
        0xff,0xf0,0x03,0xfe,0x38,0x07,0x70,0x84
    ];

    return {
        start: function() {
            LOC.IOREG += 0x10 * slot;
            io.registerSwitches(this, LOC);
            return 0xc0 + slot;
        },
        end: function() {
            return 0xc0 + slot;
        },
        ioSwitch: function(off, val) {
            if (off == LOC.IOREG && val && 'putChar' in _cbs)
                _cbs.putChar(val);
        },
        read: function(page, off) {
            return rom[off];
        },
        write: function() {}
    };
}

    
