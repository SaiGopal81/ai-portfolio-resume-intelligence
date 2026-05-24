import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function POST(req: Request) {
  try {
    const { format, optimizedContent } = await req.json();

    if (format === 'tex') {
      return new NextResponse(optimizedContent, {
        headers: {
          'Content-Type': 'application/x-tex',
          'Content-Disposition': 'attachment; filename="optimized_resume.tex"',
        },
      });
    }

    if (format === 'docx') {
      // Convert text to DOCX format
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(optimizedContent || "Optimized Resume Content")],
            }),
          ],
        }],
      });
      
      // Node.js Buffer
      const buffer = await Packer.toBuffer(doc);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename="optimized_resume.docx"',
        },
      });
    }

    if (format === 'pdf') {
      // In a production environment, this would invoke a pdflatex microservice
      // We return a generic text file disguised as PDF for structural demonstration
      const mockPdfContent = `%PDF-1.4\n1 0 obj\n<< /Title (Optimized Resume) >>\nendobj\n%... Mock PDF Content representing: ${optimizedContent}\n`;
      return new NextResponse(mockPdfContent, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="optimized_resume.pdf"',
        },
      });
    }

    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate file' }, { status: 500 });
  }
}
