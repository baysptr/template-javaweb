/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.view;

import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRRtfExporter;
import net.sf.jasperreports.engine.export.JRXmlExporter;
import net.sf.jasperreports.engine.export.oasis.JROdtExporter;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;
import org.springframework.ui.jasperreports.JasperReportsUtils;
import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;

/**
 *
 * @author cak-ust
 */
public class CustomJasperReportsMultiFormatView extends JasperReportsMultiFormatView {

    /**
     * {@inheritDoc}
     */
    protected void renderReport(JasperPrint populatedReport, Map model, HttpServletResponse response) throws Exception {
        setReportDataKey("reportData");

        String format = model.get("format").toString();
        String filename = populatedReport.getName() + "." + format;
        response.addHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");

        if (format.endsWith("docx")) {
            JRDocxExporter exporter = new JRDocxExporter();
            exporter.setParameters(model);
            JasperReportsUtils.render(exporter, populatedReport, response.getOutputStream());
        } else if (format.endsWith("odt")) {
            JROdtExporter exporter = new JROdtExporter();
            exporter.setParameters(model);
            JasperReportsUtils.render(exporter, populatedReport, response.getOutputStream());
        } else if (format.endsWith("xml")) {
            JRXmlExporter exporter = new JRXmlExporter();
            exporter.setParameters(model);
            JasperReportsUtils.render(exporter, populatedReport, response.getOutputStream());
        } else if (format.endsWith("rtf")) {
            JRRtfExporter exporter = new JRRtfExporter();
            exporter.setParameters(model);
            JasperReportsUtils.render(exporter, populatedReport, response.getOutputStream());
            /* 
             * Early testing had problems. 
             * This should work, it just doesn't for me.
             * 	
             *} else if(format.endsWith("txt")){
             *	JRTextExporter exporter = new JRTextExporter();
             * 	exporter.setParameters(model);
             * 	JasperReportsUtils.render(exporter, populatedReport, response.getOutputStream());
             */
        } else {
            //pdf, csv, html, xls
            super.renderReport(populatedReport, model, response);
        }

    }
}
