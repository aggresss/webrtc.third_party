/**************************************************************************

Copyright 2000, 2001 ATI Technologies Inc., Ontario, Canada, and
                     VA Linux Systems Inc., Fremont, California.

All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice (including the
next paragraph) shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE COPYRIGHT OWNER(S) AND/OR ITS SUPPLIERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**************************************************************************/

/*
 * Authors:
 *   Kevin E. Martin <martin@valinux.com>
 *   Gareth Hughes <gareth@valinux.com>
 *
 */

#ifndef __RADEON_TEX_H__
#define __RADEON_TEX_H__

extern void radeonSetTexOffset(__DRIcontext *pDRICtx, GLint texname,
                               unsigned long long offset, GLint depth,
                               GLuint pitch);

extern void radeonSetTexBuffer(__DRIcontext *pDRICtx, GLint target, __DRIdrawable *dPriv);
extern void radeonSetTexBuffer2(__DRIcontext *pDRICtx, GLint target, GLint glx_texture_format,
			       __DRIdrawable *dPriv);

extern void radeonUpdateTextureState( GLcontext *ctx );

extern int radeonUploadTexImages( r100ContextPtr rmesa, radeonTexObjPtr t,
				  GLuint face );

extern void radeonDestroyTexObj( r100ContextPtr rmesa, radeonTexObjPtr t );

extern void radeonInitTextureFuncs( radeonContextPtr radeon, struct dd_function_table *functions );

#endif /* __RADEON_TEX_H__ */
